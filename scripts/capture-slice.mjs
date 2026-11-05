import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const evidenceDir = path.join(rootDir, 'docs', 'evidence');
fs.mkdirSync(evidenceDir, { recursive: true });

const prefix = process.argv[2] || 'before';

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

    // 1. Exterior Hero
    console.log(`[Capture] Capturing ${prefix}-hero...`);
    await page.goto(`${baseUrl}/#/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(page, 'exterior');
    await page.screenshot({ path: path.join(evidenceDir, `${prefix}-hero.png`), timeout: 60000 });

    // 2. Level 8 Bay Closeup
    console.log(`[Capture] Capturing ${prefix}-bay-closeup...`);
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 1.05, behavior: 'instant' });
      window.dispatchEvent(new Event('scroll'));
    });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(evidenceDir, `${prefix}-bay-closeup.png`), timeout: 60000 });

    // 3. Interior Living Room Tour
    console.log(`[Capture] Capturing ${prefix}-interior-living...`);
    await page.goto(`${baseUrl}/#/explore/homes/A0801/tour/living`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForSceneReady(page, 'living');
    await page.screenshot({ path: path.join(evidenceDir, `${prefix}-interior-living.png`), timeout: 60000 });

    console.log(`[Capture] Successfully captured ${prefix} evidence.`);
  } finally {
    await browser.close();
  }
}

capture().catch((err) => {
  console.error('[Capture] Error:', err);
  process.exit(1);
});
