import { chromium } from '@playwright/test';
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

async function capture() {
  const baseUrl = 'http://localhost:5173';
  const browser = await chromium.launch({
    headless: true,
    args: ['--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--ignore-gpu-blocklist']
  });

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 820 },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();

    // 1. Full Exterior Hero
    console.log('[Capture] Capturing Full Exterior Hero (1440x820)...');
    await page.goto(`${baseUrl}/#/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(page, 'exterior');
    const heroEvidence = path.join(evidenceDir, 'checkpoint-hero-full.png');
    const heroReview = path.join(reviewDir, 'checkpoint-hero-full.png');
    await page.screenshot({ path: heroEvidence, timeout: 60000 });
    fs.copyFileSync(heroEvidence, heroReview);

    // 2. Genuinely Close Level 8 Bay View
    console.log('[Capture] Scrolling to Level 8 Bay Beat for Genuine Close-up...');
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 1.15, behavior: 'instant' });
      window.dispatchEvent(new Event('scroll'));
    });
    await page.waitForTimeout(1800);
    const bayEvidence = path.join(evidenceDir, 'checkpoint-bay-genuine-closeup.png');
    const bayReview = path.join(reviewDir, 'checkpoint-bay-genuine-closeup.png');
    await page.screenshot({ path: bayEvidence, timeout: 60000 });
    fs.copyFileSync(bayEvidence, bayReview);

    // 3. Standalone Interior Tour (Living Room)
    console.log('[Capture] Capturing Standalone Living Tour to verify isolation...');
    await page.goto(`${baseUrl}/#/explore/homes/A0801/tour/living`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(page, 'living');
    const intEvidence = path.join(evidenceDir, 'checkpoint-interior-living.png');
    const intReview = path.join(reviewDir, 'checkpoint-interior-living.png');
    await page.screenshot({ path: intEvidence, timeout: 60000 });
    fs.copyFileSync(intEvidence, intReview);

    console.log('[Capture] Checkpoint captures completed successfully.');
  } finally {
    await browser.close();
  }
}

capture().catch((err) => {
  console.error('[Capture] Error:', err);
  process.exit(1);
});
