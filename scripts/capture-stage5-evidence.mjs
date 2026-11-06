import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const evidenceDir = path.join(rootDir, 'docs', 'evidence');
const reviewDir = path.join(rootDir, 'review-output');
fs.mkdirSync(evidenceDir, { recursive: true });
fs.mkdirSync(reviewDir, { recursive: true });

const phase = process.argv.find((arg) => arg.startsWith('--phase='))?.split('=')[1] || 'before';

async function isServerReady(url) {
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
    if (await isServerReady(url)) return true;
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

async function waitForSceneReady(page, expectedRoom) {
  await page.waitForSelector('canvas', { timeout: 25000 });
  await page.waitForFunction(
    (room) => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return false;
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl || gl.isContextLost()) return false;
      if (canvas.width <= 300 || canvas.height <= 150) return false;
      return canvas.dataset.sceneReady === 'true' && (!room || canvas.dataset.activeRoom === room);
    },
    expectedRoom,
    { timeout: 25000 }
  );
  await page.waitForTimeout(1000);
}

async function saveScreenshot(page, filename) {
  const p1 = path.join(evidenceDir, filename);
  const p2 = path.join(reviewDir, filename);
  await page.screenshot({ path: p1 });
  fs.copyFileSync(p1, p2);
  console.log(`[Evidence] Saved ${filename}`);
}

async function capture() {
  const baseUrl = 'http://localhost:4174';
  let serverProcess = null;
  const isRunning = await isServerReady(baseUrl);

  if (!isRunning) {
    console.log('[Evidence] Starting preview server on port 4174...');
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
      if (serverProcess && serverProcess.pid) {
        if (process.platform === 'win32') {
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
    // 1. Desktop Exterior Hero & Close-ups
    console.log(`[Evidence] 1. Desktop Exterior Hero (${phase})...`);
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 820 },
      deviceScaleFactor: 1
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(`${baseUrl}/#/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(desktopPage, 'exterior');
    await saveScreenshot(desktopPage, `stage5-${phase}-hero-desktop.png`);

    // 2. Level 8 Close-up
    console.log(`[Evidence] 2. Level 8 Close-up (${phase})...`);
    await desktopPage.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 1.15, behavior: 'instant' });
      window.dispatchEvent(new Event('scroll'));
    });
    await desktopPage.waitForTimeout(1800);
    await saveScreenshot(desktopPage, `stage5-${phase}-level8-closeup.png`);

    // 3. Another Floor (Level 4 Close-up)
    console.log(`[Evidence] 3. Level 4 Close-up (${phase})...`);
    await desktopPage.goto(`${baseUrl}/#/explore/homes/A0401`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await desktopPage.evaluate(() => window.scrollTo(0, 0));
    await waitForSceneReady(desktopPage, 'unit');
    await desktopPage.waitForTimeout(1800);
    await saveScreenshot(desktopPage, `stage5-${phase}-floor4-closeup.png`);

    // Close desktop context before mobile to free WebGL context
    await desktopContext.close();

    // 4. Mobile Hero (390px)
    console.log(`[Evidence] 4. Mobile Hero 390px (${phase})...`);
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${baseUrl}/#/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(mobilePage, 'exterior');
    await saveScreenshot(mobilePage, `stage5-${phase}-hero-mobile-390px.png`);
    await mobileContext.close();

    // 5. Interior Living-room Isolation Smoke Test
    console.log(`[Evidence] 5. Interior Living Room Smoke Test (${phase})...`);
    const tourContext = await browser.newContext({
      viewport: { width: 1440, height: 820 },
      deviceScaleFactor: 1
    });
    const tourPage = await tourContext.newPage();
    await tourPage.goto(`${baseUrl}/#/explore/homes/A0801/tour/living`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(tourPage, 'living');
    await tourPage.waitForTimeout(1000);
    await saveScreenshot(tourPage, `stage5-${phase}-interior-living-smoke.png`);
    await tourContext.close();

    console.log(`[Evidence] Successfully captured all 5 stills for phase: ${phase}`);
  } finally {
    await browser.close();
    if (serverProcess && serverProcess.pid) {
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', String(serverProcess.pid), '/f', '/t'], { stdio: 'ignore', shell: true });
      } else {
        serverProcess.kill('SIGTERM');
      }
    }
  }
}

capture().catch((err) => {
  console.error('[Evidence] Error:', err);
  process.exit(1);
});
