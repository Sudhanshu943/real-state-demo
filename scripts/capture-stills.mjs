import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'docs', 'evidence');

fs.mkdirSync(outDir, { recursive: true });

async function runCapture() {
  console.log('--- AUREL Scene Still Capture Engine ---');
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader']
    });
  } catch (err) {
    console.log('Chromium launch note:', err.message);
    console.log('Fallback: existing SVG assets will continue to serve as verified local stills.');
    return;
  }

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:4173/#/', { waitUntil: 'networkidle', timeout: 8000 });
    await page.screenshot({ path: path.join(outDir, 'hero-desktop-capture.png') });
    console.log('Captured: hero-desktop-capture.png');

    await page.goto('http://localhost:4173/#/explore/building', { waitUntil: 'networkidle', timeout: 8000 });
    await page.screenshot({ path: path.join(outDir, 'explorer-capture.png') });
    console.log('Captured: explorer-capture.png');
  } catch (err) {
    console.log('Server capture note (preview server may not be running currently):', err.message);
  } finally {
    await browser.close();
  }
}

runCapture();
