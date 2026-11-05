import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'docs', 'evidence');

fs.mkdirSync(outDir, { recursive: true });

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

async function waitForSceneReady(page, expectedRoom) {
  // 1. Ensure canvas element is attached to DOM
  await page.waitForSelector('canvas', { timeout: 25000 });

  // 2. Wait for canvas dimensions to be properly sized by ResizeObserver (>300x150)
  // and WebGL context to be initialized and active, and sceneReady flag set
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

  // 3. Short settle to allow final render compositor swap
  await page.waitForTimeout(400);
}

async function runCapture() {
  console.log('--- AUREL Automated Scene Capture & Verification Engine ---');
  const runStartTime = Date.now() - 2000;

  let serverProcess = null;
  let browser = null;
  let hasCriticalErrors = false;

  const capturedFiles = [];
  const requiredOutputs = [
    'hero-initial.png',
    'level8-bay-closeup.png',
    'interior-salon-vignette.png',
    'canvas-tour-living.png',
    'tour-living-visible.png',
    'tour-living-failed-plant.png',
    'canvas-tour-living-failed-plant.png',
    'tour-bedroom-visible.png',
    'canvas-tour-bedroom.png',
    'tour-balcony-visible.png',
    'canvas-tour-balcony.png',
    'homepage-interior-beat.png',
    'canvas-homepage-interior.png',
    'mobile-390px.png',
    'mobile-interior-tour.png',
    'canvas-mobile-interior.png'
  ];

  const cleanup = async () => {
    if (browser) {
      try { await browser.close(); } catch { /* ignore */ }
    }
    // Clean up ONLY processes spawned by this script
    if (serverProcess) {
      try {
        if (process.platform === 'win32' && serverProcess.pid) {
          spawn('taskkill', ['/pid', String(serverProcess.pid), '/f', '/t'], { stdio: 'ignore', shell: true });
        } else {
          serverProcess.kill('SIGTERM');
        }
      } catch { /* ignore */ }
    }
  };

  process.on('SIGINT', async () => { await cleanup(); process.exit(1); });
  process.on('SIGTERM', async () => { await cleanup(); process.exit(1); });

  try {
    // 1. Check or start preview server on isolated port 4174
    const targetUrl = 'http://localhost:4174';
    const serverAlreadyUp = await isAurelServerReady(targetUrl);

    if (!serverAlreadyUp) {
      console.log('Starting preview server on port 4174 (--strictPort)...');
      serverProcess = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'preview'], {
        cwd: rootDir,
        stdio: 'pipe',
        shell: true
      });

      const ready = await waitForServer(targetUrl);
      if (!ready) {
        throw new Error('Failed to start preview server on port 4174 within timeout.');
      }
      console.log('Preview server confirmed running on port 4174 (AUREL validated).');
    } else {
      console.log('Verified existing AUREL server active on port 4174.');
    }

    // 2. Launch Chromium with deterministic WebGL flags
    browser = await chromium.launch({
      headless: true,
      args: [
        '--enable-webgl',
        '--use-gl=angle',
        '--use-angle=swiftshader',
        '--ignore-gpu-blocklist'
      ]
    });

    // 3. Desktop Captures (1440x900)
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1
    });

    const page = await desktopContext.newPage();

    // Attach strict diagnostic listeners
    page.on('pageerror', (err) => {
      console.error('[Page Error]:', err.message);
      hasCriticalErrors = true;
    });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error('[Console Error]:', msg.text());
        hasCriticalErrors = true;
      }
    });

    page.on('requestfailed', (req) => {
      const failureText = req.failure()?.errorText || '';
      if (!failureText.includes('ERR_ABORTED')) {
        console.error(`[Asset Request Failed]: ${req.url()} (${failureText})`);
        hasCriticalErrors = true;
      }
    });

    page.on('response', (res) => {
      if (res.status() >= 400 && res.url().includes('localhost:4174')) {
        console.error(`[HTTP Error ${res.status()}]: ${res.url()}`);
        hasCriticalErrors = true;
      }
    });

    // --- CAPTURE 1: Initial Hero View ---
    console.log('1. Capturing: Initial Hero View...');
    await page.goto(`${targetUrl}/#/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(page, 'exterior');
    const heroPath = path.join(outDir, 'hero-initial.png');
    await page.screenshot({ path: heroPath });
    capturedFiles.push('hero-initial.png');
    console.log(`✓ Produced: ${heroPath}`);

    // --- CAPTURE 2: Level 8 Bay Close-up (Scroll Beat 2) ---
    console.log('2. Capturing: Level 8 Architectural Bay Close-up...');
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 1.0, behavior: 'instant' });
      window.dispatchEvent(new Event('scroll'));
    });
    await page.waitForTimeout(1000);
    const bayPath = path.join(outDir, 'level8-bay-closeup.png');
    await page.screenshot({ path: bayPath });
    capturedFiles.push('level8-bay-closeup.png');
    console.log(`✓ Produced: ${bayPath}`);

    // --- CAPTURE 3: Homepage Interior Beat (Scroll Beat 3, scrollProgress ~0.65) ---
    console.log('3. Capturing: Homepage Interior Beat...');
    await page.evaluate(() => {
      // Pinned track height is 360vh (scrollable distance = 2.6 * innerHeight)
      // s = 0.65 corresponds to top: innerHeight * 1.7
      window.scrollTo({ top: window.innerHeight * 1.7, behavior: 'instant' });
      window.dispatchEvent(new Event('scroll'));
    });
    // Allow damped animation loop to settle target scroll progress
    await page.waitForTimeout(800);
    await waitForSceneReady(page, 'living');
    const homeIntPath = path.join(outDir, 'homepage-interior-beat.png');
    await page.screenshot({ path: homeIntPath });
    capturedFiles.push('homepage-interior-beat.png');

    const homeCanvasEl = await page.$('canvas');
    if (homeCanvasEl) {
      const box = await homeCanvasEl.boundingBox();
      if (box) {
        const homeCanvasPath = path.join(outDir, 'canvas-homepage-interior.png');
        await page.screenshot({ path: homeCanvasPath, clip: box });
        capturedFiles.push('canvas-homepage-interior.png');
      }
    }
    console.log(`✓ Produced: ${homeIntPath}`);

    // --- CAPTURE 4: Standalone Tour - Living Room with Potted Plant ---
    console.log('4. Capturing: Standalone Tour - Living Room (with CC0 Plant)...');
    await page.goto(`${targetUrl}/#/explore/homes/A0801/tour/living`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(page, 'living');

    // Wait for GLB plant status
    await page.waitForFunction(() => {
      const c = document.querySelector('canvas');
      return c && c.dataset.plantStatus === 'glb';
    }, undefined, { timeout: 15000 });

    const interiorPath = path.join(outDir, 'interior-salon-vignette.png');
    await page.screenshot({ path: interiorPath });
    capturedFiles.push('interior-salon-vignette.png');

    const livingPath = path.join(outDir, 'tour-living-visible.png');
    await page.screenshot({ path: livingPath });
    capturedFiles.push('tour-living-visible.png');

    const livingCanvasEl = await page.$('canvas');
    if (livingCanvasEl) {
      const livingCanvasPath = path.join(outDir, 'canvas-tour-living.png');
      await livingCanvasEl.screenshot({ path: livingCanvasPath });
      capturedFiles.push('canvas-tour-living.png');
    }
    console.log(`✓ Produced: ${interiorPath} and canvas-tour-living.png`);

    // --- CAPTURE 5: Standalone Tour - Bedroom ---
    console.log('5. Capturing: Standalone Tour - Primary Bedroom...');
    await page.click('button:has-text("Primary Bedroom")');
    await waitForSceneReady(page, 'bedroom');
    const bedroomPath = path.join(outDir, 'tour-bedroom-visible.png');
    await page.screenshot({ path: bedroomPath });
    capturedFiles.push('tour-bedroom-visible.png');

    const bedroomCanvasEl = await page.$('canvas');
    if (bedroomCanvasEl) {
      const bedroomCanvasPath = path.join(outDir, 'canvas-tour-bedroom.png');
      await bedroomCanvasEl.screenshot({ path: bedroomCanvasPath });
      capturedFiles.push('canvas-tour-bedroom.png');
    }
    console.log(`✓ Produced: ${bedroomPath}`);

    // --- CAPTURE 6: Standalone Tour - Balcony ---
    console.log('6. Capturing: Standalone Tour - Garden Balcony...');
    await page.click('button:has-text("Balcony")');
    await waitForSceneReady(page, 'balcony');
    const balconyPath = path.join(outDir, 'tour-balcony-visible.png');
    await page.screenshot({ path: balconyPath });
    capturedFiles.push('tour-balcony-visible.png');

    const balconyCanvasEl = await page.$('canvas');
    if (balconyCanvasEl) {
      const balconyCanvasPath = path.join(outDir, 'canvas-tour-balcony.png');
      await balconyCanvasEl.screenshot({ path: balconyCanvasPath });
      capturedFiles.push('canvas-tour-balcony.png');
    }
    console.log(`✓ Produced: ${balconyPath}`);

    await desktopContext.close();

    // --- CAPTURE 7: Deliberately Failed Plant Request Fallback ---
    console.log('7. Capturing: Living Tour with Deliberately Failed Plant Request...');
    const failureContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const failPage = await failureContext.newPage();
    // Intercept and abort the GLB request
    await failPage.route('**/potted_plant_01.glb', route => route.abort('failed'));
    await failPage.goto(`${targetUrl}/#/explore/homes/A0801/tour/living`, { waitUntil: 'domcontentloaded' });
    await waitForSceneReady(failPage, 'living');

    // Wait for plantStatus === 'fallback'
    await failPage.waitForFunction(() => {
      const c = document.querySelector('canvas');
      return c && c.dataset.plantStatus === 'fallback';
    }, undefined, { timeout: 15000 });

    const failLivingPath = path.join(outDir, 'tour-living-failed-plant.png');
    await failPage.screenshot({ path: failLivingPath });
    capturedFiles.push('tour-living-failed-plant.png');

    const failCanvasEl = await failPage.$('canvas');
    if (failCanvasEl) {
      const failCanvasPath = path.join(outDir, 'canvas-tour-living-failed-plant.png');
      await failCanvasEl.screenshot({ path: failCanvasPath });
      capturedFiles.push('canvas-tour-living-failed-plant.png');
    }
    console.log(`✓ Produced: ${failLivingPath}`);
    await failureContext.close();

    // --- CAPTURE 8: Mobile Phone Viewport (390x844) ---
    console.log('8. Capturing: Mobile Viewports (Homepage & Interior Tour)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2
    });
    const mobilePage = await mobileContext.newPage();
    mobilePage.on('pageerror', (err) => { console.error('[Mobile Error]:', err.message); hasCriticalErrors = true; });

    // Mobile Hero
    await mobilePage.goto(`${targetUrl}/#/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(mobilePage, 'exterior');
    const mobileHeroPath = path.join(outDir, 'mobile-390px.png');
    await mobilePage.screenshot({ path: mobileHeroPath });
    capturedFiles.push('mobile-390px.png');

    // Mobile Tour
    await mobilePage.goto(`${targetUrl}/#/explore/homes/A0801/tour/living`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(mobilePage, 'living');
    const mobileTourPath = path.join(outDir, 'mobile-interior-tour.png');
    await mobilePage.screenshot({ path: mobileTourPath });
    capturedFiles.push('mobile-interior-tour.png');

    const mobileCanvasEl = await mobilePage.$('canvas');
    if (mobileCanvasEl) {
      const mobileCanvasPath = path.join(outDir, 'canvas-mobile-interior.png');
      await mobileCanvasEl.screenshot({ path: mobileCanvasPath });
      capturedFiles.push('canvas-mobile-interior.png');
    }
    console.log(`✓ Produced: ${mobileHeroPath} and ${mobileTourPath}`);

    await mobileContext.close();

    // 4. Verify that all required files were generated during this run and exceed size limits
    console.log('\n--- Verifying Output Artifacts & Timestamps ---');
    for (const reqFile of requiredOutputs) {
      const fullPath = path.join(outDir, reqFile);
      if (!fs.existsSync(fullPath)) {
        throw new Error(`Missing expected capture output: ${reqFile}`);
      }
      const stat = fs.statSync(fullPath);
      if (stat.mtimeMs < runStartTime) {
        throw new Error(`Output file ${reqFile} is stale (modified before capture run).`);
      }
      if (stat.size < 25000) {
        throw new Error(`Capture output ${reqFile} is suspiciously small (${stat.size} bytes).`);
      }
      console.log(`  ✓ ${reqFile.padEnd(35)}: ${(stat.size / 1024).toFixed(1)} KB (fresh)`);
    }

    if (hasCriticalErrors) {
      throw new Error('Capture run completed with detected console or network errors.');
    }

    console.log('\n✓ All visual proof captures successfully produced, validated, and verified.');
  } catch (err) {
    console.error('\nCAPTURE FAILURE:', err.message);
    await cleanup();
    process.exit(1);
  }

  await cleanup();
  process.exit(0);
}

runCapture();
