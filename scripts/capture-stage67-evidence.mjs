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
const artifactDir = 'C:\\Users\\Sudhanshu\\.gemini\\antigravity\\brain\\afaf6719-8116-4b52-94fd-f6773712c069';

fs.mkdirSync(evidenceDir, { recursive: true });
fs.mkdirSync(reviewDir, { recursive: true });
if (fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

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

async function waitForVegetationLoaded(page, timeoutMs = 15000) {
  try {
    await page.waitForFunction(() => {
      const c = document.querySelector('canvas');
      return c && c.dataset.exteriorVegetation === 'glb';
    }, undefined, { timeout: timeoutMs });
    await page.waitForTimeout(1200);
  } catch {
    console.warn('[Evidence] Vegetation GLB load wait timed out, continuing with active render state.');
  }
}

async function saveScreenshot(page, filename) {
  const p1 = path.join(evidenceDir, filename);
  const p2 = path.join(reviewDir, filename);
  await page.screenshot({ path: p1, timeout: 90000 });
  fs.copyFileSync(p1, p2);
  if (fs.existsSync(artifactDir)) {
    fs.copyFileSync(p1, path.join(artifactDir, filename));
  }
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
    // 1. Desktop Exterior Hero (1440x820)
    console.log('[Evidence] 1. Desktop Exterior Hero...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 820 },
      deviceScaleFactor: 1
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(`${baseUrl}/#/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(desktopPage, 'exterior');
    await waitForVegetationLoaded(desktopPage);
    await saveScreenshot(desktopPage, 'stage67-hero-desktop.png');

    // 2. Genuine Arrival Plaza Close-up (Inspection Camera at Arrival Court)
    console.log('[Evidence] 2. Genuine Arrival Plaza Close-up...');
    await desktopPage.goto(`${baseUrl}/#/explore/building`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(desktopPage, 'building');
    await waitForVegetationLoaded(desktopPage);
    // Position inspection camera at eye level overlooking entrance, paving, curbs, pools, and shadow reveal
    await desktopPage.evaluate(() => {
      const cam = (window).__AUREL_CAMERA__;
      const ctrl = (window).__AUREL_CONTROLS__;
      if (cam) {
        cam.position.set(20, 3.8, 30);
        cam.lookAt(0, 1.2, 12);
        if (ctrl) {
          ctrl.target.set(0, 1.2, 12);
          ctrl.update();
        }
      }
    });
    await desktopPage.waitForTimeout(1500);
    await saveScreenshot(desktopPage, 'stage67-arrival-plaza-closeup.png');

    // 3. Genuine Tree & Shrub Detail Close-up
    console.log('[Evidence] 3. Botanical Tree & Shrub Detail...');
    await desktopPage.evaluate(() => {
      const cam = (window).__AUREL_CAMERA__;
      const ctrl = (window).__AUREL_CONTROLS__;
      if (cam) {
        cam.position.set(13, 2.6, 23);
        cam.lookAt(9, 2.2, 17);
        if (ctrl) {
          ctrl.target.set(9, 2.2, 17);
          ctrl.update();
        }
      }
    });
    await desktopPage.waitForTimeout(1500);
    await saveScreenshot(desktopPage, 'stage67-tree-shrub-detail.png');

    // 3b. Genuine Soil / Planter Ground Contact Close-up
    console.log('[Evidence] 3b. Soil / Planter Ground Contact Detail...');
    await desktopPage.evaluate(() => {
      const cam = (window).__AUREL_CAMERA__;
      const ctrl = (window).__AUREL_CONTROLS__;
      if (cam) {
        cam.position.set(11.2, 1.2, 20.5);
        cam.lookAt(9.8, 0.35, 17.8);
        if (ctrl) {
          ctrl.target.set(9.8, 0.35, 17.8);
          ctrl.update();
        }
      }
    });
    await desktopPage.waitForTimeout(1500);
    await saveScreenshot(desktopPage, 'stage67-soil-ground-contact.png');
    await desktopContext.close();

    // 4. Mobile Hero (360px - Small viewport)
    console.log('[Evidence] 4. Mobile Hero at 360px...');
    const m360Context = await browser.newContext({
      viewport: { width: 360, height: 740 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 1
    });
    const m360Page = await m360Context.newPage();
    await m360Page.goto(`${baseUrl}/#/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(m360Page, 'exterior');
    await waitForVegetationLoaded(m360Page);
    await saveScreenshot(m360Page, 'stage67-hero-mobile-360px.png');
    await m360Context.close();

    // 5. Mobile Hero (390px - Standard iPhone 14/15 viewport)
    console.log('[Evidence] 5. Mobile Hero at 390px...');
    const m390Context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 1
    });
    const m390Page = await m390Context.newPage();
    await m390Page.goto(`${baseUrl}/#/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(m390Page, 'exterior');
    await waitForVegetationLoaded(m390Page);
    await saveScreenshot(m390Page, 'stage67-hero-mobile-390px.png');

    // 6. Mobile Story Transition & Badge Clearance (scrolled)
    console.log('[Evidence] 6. Mobile Story Transition & Badge Clearance...');
    await m390Page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'instant' });
      window.dispatchEvent(new Event('scroll'));
    });
    await m390Page.waitForTimeout(1800);
    await saveScreenshot(m390Page, 'stage67-mobile-badge-clearance.png');

    // 6b. Mobile Menu Active Interaction
    console.log('[Evidence] 6b. Mobile Menu Active Interaction...');
    await m390Page.evaluate(() => window.scrollTo(0, 0));
    await m390Page.waitForTimeout(600);
    const menuBtn = m390Page.locator('button.mobile-toggle, button[aria-label*="Menu" i]').first();
    await menuBtn.click();
    await m390Page.waitForTimeout(500);
    await saveScreenshot(m390Page, 'stage67-mobile-menu-active.png');
    await menuBtn.click(); // close menu
    await m390Context.close();

    // 6c. Mobile Hero on Short Viewport (360x640)
    console.log('[Evidence] 6c. Mobile Hero on Short Viewport (360x640)...');
    const mShortContext = await browser.newContext({
      viewport: { width: 360, height: 640 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 1
    });
    const mShortPage = await mShortContext.newPage();
    await mShortPage.goto(`${baseUrl}/#/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(mShortPage, 'exterior');
    await waitForVegetationLoaded(mShortPage);
    await saveScreenshot(mShortPage, 'stage67-hero-mobile-short-360x640.png');
    await mShortContext.close();

    // 7. Mobile Hero (430px - Large iPhone Pro Max viewport)
    console.log('[Evidence] 7. Mobile Hero at 430px...');
    const m430Context = await browser.newContext({
      viewport: { width: 430, height: 932 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 1
    });
    const m430Page = await m430Context.newPage();
    await m430Page.goto(`${baseUrl}/#/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(m430Page, 'exterior');
    await waitForVegetationLoaded(m430Page);
    await saveScreenshot(m430Page, 'stage67-hero-mobile-430px.png');
    await m430Context.close();

    // 8. Interior Living-room Isolation Smoke Test (1440x820)
    console.log('[Evidence] 8. Interior Living Room Smoke Test...');
    const tourContext = await browser.newContext({
      viewport: { width: 1440, height: 820 },
      deviceScaleFactor: 1
    });
    const tourPage = await tourContext.newPage();
    await tourPage.goto(`${baseUrl}/#/explore/homes/A0801/tour/living`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(tourPage, 'living');
    await tourPage.waitForTimeout(1000);
    await saveScreenshot(tourPage, 'stage67-interior-living-smoke.png');
    await tourContext.close();

    console.log('[Evidence] Successfully captured all Stage 6 & 7 evidence stills!');
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
