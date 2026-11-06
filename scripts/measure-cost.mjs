import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function isAurelServerReady(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return false;
    const text = await res.text();
    return text.includes('AUREL') || text.includes('aurel');
  } catch {
    return false;
  }
}

async function waitForServer(url, timeoutMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await isAurelServerReady(url)) return true;
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

async function waitForSceneReady(page, expectedRoom, timeoutMs = 45000) {
  await page.waitForSelector('canvas', { timeout: timeoutMs });
  await page.waitForFunction(
    (room) => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return false;
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl || gl.isContextLost()) return false;
      if (canvas.width <= 250 || canvas.height <= 150) return false;
      return canvas.dataset.sceneReady === 'true' && (!room || canvas.dataset.activeRoom === room);
    },
    expectedRoom,
    { timeout: timeoutMs }
  );
  await page.waitForTimeout(600);
}

async function waitForVegetationLoaded(page, timeoutMs = 25000) {
  try {
    await page.waitForFunction(() => {
      const c = document.querySelector('canvas');
      return c && (c.dataset.exteriorVegetation === 'glb' || c.dataset.exteriorVegetation === 'fallback');
    }, undefined, { timeout: timeoutMs });
    await page.waitForTimeout(1000);
  } catch {
    console.warn('[Measure] Vegetation load wait timed out, continuing with active render state.');
  }
}

async function sampleMetrics(page, label, scrollState = 'n/a') {
  const data = await page.evaluate((state) => {
    const canvas = document.querySelector('canvas');
    const metrics = (window).__AUREL_METRICS__ || { calls: 0, triangles: 0, geometries: 0, textures: 0 };
    return {
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      scrollState: state,
      vegStatus: canvas?.dataset?.exteriorVegetation || 'n/a',
      sceneReady: canvas?.dataset?.sceneReady || 'false',
      ...metrics
    };
  }, scrollState);
  return { label, ...data };
}

async function run() {
  const baseUrl = 'http://localhost:4174';
  let serverProcess = null;
  const isRunning = await isAurelServerReady(baseUrl);

  if (!isRunning) {
    console.log('[Measure] Starting preview server on port 4174...');
    serverProcess = spawn(
      process.platform === 'win32' ? 'npm.cmd' : 'npm',
      ['run', 'preview'],
      {
        cwd: rootDir,
        stdio: 'pipe',
        shell: true
      }
    );
    const ready = await waitForServer(baseUrl, 25000);
    if (!ready) {
      if (serverProcess) {
        if (process.platform === 'win32' && serverProcess.pid) {
          spawn('taskkill', ['/pid', String(serverProcess.pid), '/f', '/t'], { stdio: 'ignore', shell: true });
        } else {
          serverProcess.kill();
        }
      }
      throw new Error(`Preview server on ${baseUrl} failed to respond.`);
    }
  }

  const browser = await chromium.launch({
    headless: true,
    args: ['--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--ignore-gpu-blocklist']
  });

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();
    const results = [];

    // 1. Initial Desktop Exterior Hero
    console.log('[Measure] 1. Measuring Exterior Hero Desktop (s=0)...');
    await page.goto(`${baseUrl}/#/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(page, 'exterior');
    await waitForVegetationLoaded(page);
    // Allow camera pose and renderer statistics to settle
    await page.waitForTimeout(1500);
    results.push(await sampleMetrics(page, 'Exterior Hero Desktop (s=0)', 's=0.00'));

    // 2. Level 8 Bay Closeup
    console.log('[Measure] 2. Measuring Exterior Level 8 Bay (s=0.33)...');
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 1.0, behavior: 'instant' });
      window.dispatchEvent(new Event('scroll'));
    });
    await page.waitForTimeout(1500);
    results.push(await sampleMetrics(page, 'Exterior Level 8 Bay (s=0.33)', 's=0.33'));

    // 3. Homepage Interior Beat
    console.log('[Measure] 3. Measuring Homepage Interior Beat (s=0.65)...');
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 1.8, behavior: 'instant' });
      window.dispatchEvent(new Event('scroll'));
    });
    await waitForSceneReady(page, 'living');
    // Allow requestAnimationFrame scroll damping to settle into the furnished room (skip transient cube-camera frame)
    await page.waitForFunction(() => {
      const m = (window).__AUREL_METRICS__;
      return m && m.calls > 50;
    }, undefined, { timeout: 15000 });
    await page.waitForTimeout(500);
    results.push(await sampleMetrics(page, 'Homepage Interior Beat (s=0.65)', 's=0.65'));

    // 4. Standalone Living Tour
    console.log('[Measure] 4. Measuring Standalone Tour: Living...');
    await page.goto(`${baseUrl}/#/explore/homes/A0801/tour/living`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await waitForSceneReady(page, 'living');
    await page.waitForTimeout(1000);
    results.push(await sampleMetrics(page, 'Standalone Tour: Living', 'tour'));

    // 5. Standalone Bedroom Tour
    console.log('[Measure] 5. Measuring Standalone Tour: Bedroom...');
    await page.click('button:has-text("Primary Bedroom")');
    await waitForSceneReady(page, 'bedroom');
    await page.waitForTimeout(1000);
    results.push(await sampleMetrics(page, 'Standalone Tour: Bedroom', 'tour'));

    // 6. Standalone Balcony Tour
    console.log('[Measure] 6. Measuring Standalone Tour: Balcony...');
    await page.click('button:has-text("Balcony")');
    await waitForSceneReady(page, 'balcony');
    await page.waitForTimeout(1000);
    results.push(await sampleMetrics(page, 'Standalone Tour: Balcony', 'tour'));
    await context.close();

    // 7. Mobile Hero (390x844)
    console.log('[Measure] 7. Measuring Mobile Hero (390x844, s=0)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 1
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${baseUrl}/#/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(mobilePage, 'exterior');
    await waitForVegetationLoaded(mobilePage);
    await mobilePage.waitForTimeout(1500);
    results.push(await sampleMetrics(mobilePage, 'Exterior Hero Mobile (390px, s=0)', 's=0.00'));
    await mobileContext.close();

    console.log('\n================ MEASURED RENDERING METRICS ================');
    console.table(results);
    console.log('============================================================\n');
  } finally {
    await browser.close();
    if (serverProcess) {
      if (process.platform === 'win32' && serverProcess.pid) {
        spawn('taskkill', ['/pid', String(serverProcess.pid), '/f', '/t'], { stdio: 'ignore', shell: true });
      } else {
        serverProcess.kill('SIGTERM');
      }
    }
  }
}

run().catch((err) => {
  console.error('[Measure] Error:', err);
  process.exit(1);
});
