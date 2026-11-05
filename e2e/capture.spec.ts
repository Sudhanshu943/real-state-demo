import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const evidenceDir = path.resolve(process.cwd(), 'docs', 'evidence');

test.describe('Visual Acceptance Evidence Capture — Architectural Redesign Milestone', () => {
  test.beforeAll(() => {
    fs.mkdirSync(evidenceDir, { recursive: true });
  });

  test('Slice 1 Visual Evidence Deliverables: Hero, Level 8 Bay, Interior Salon Vignette, Mobile 390px', async ({ page, isMobile }) => {
    test.setTimeout(120000);
    if (!isMobile) {
      // 1. Initial Hero (1440x900) - Tower at hero distance
      await page.goto('/#/');
      await page.waitForTimeout(1200);
      await page.screenshot({ path: path.join(evidenceDir, 'hero-initial.png') });

      // 2. Level 8 Bay Close-up (Architectural Facade Module with 220mm recess, sill, mullions & crystal balustrade)
      await page.evaluate(() => {
        window.scrollTo({ top: window.innerHeight * 1.05, behavior: 'instant' });
        window.dispatchEvent(new Event('scroll'));
      });
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(evidenceDir, 'level8-bay-closeup.png') });

      // 3. Interior Salon Vignette with CC0 Potted Plant GLB on oak parquet
      await page.goto('/#/explore/homes/A0801/tour/living');
      await page.waitForFunction(() => {
        const c = document.querySelector('canvas');
        return c && c.dataset.sceneReady === 'true' && c.dataset.activeRoom === 'living' && c.width > 300;
      }, undefined, { timeout: 25000 });
      await page.screenshot({ path: path.join(evidenceDir, 'interior-salon-vignette.png') });
    } else {
      // 4. Phone Viewport
      await page.goto('/#/');
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(evidenceDir, 'mobile-390px.png') });
    }
  });

  test('Desktop Evidence: Homepage Live 3D & Choreographed Scroll Beats', async ({ page, isMobile }) => {
    if (isMobile) return;
    test.setTimeout(120000);

    // 1. Initial Hero with Live 3D Tower & Tone-Mapped Travertine
    await page.goto('/#/');
    await page.waitForTimeout(600);
    await expect(page.locator('h1')).toContainText('A different');
    await expect(page.locator('h1 em')).toContainText('On home.');
    await page.screenshot({ path: path.join(evidenceDir, '01-hero-live3d.png') });

    // 2. Scroll to Beat 2 (Level 8 Facade & Terrace Reveal)
    await page.evaluate(() => {
      window.scrollTo(0, window.innerHeight * 1.0);
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(evidenceDir, '02-facade-beat-level8.png') });

    // 3. Scroll to Beat 3 (Living Salon Interior Handoff)
    await page.evaluate(() => {
      window.scrollTo(0, window.innerHeight * 1.7);
    });
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(evidenceDir, '03-interior-handoff-living.png') });

    // 4. Scroll to Beat 4 (Composed Sunset Balcony Horizon)
    await page.evaluate(() => {
      window.scrollTo(0, window.innerHeight * 2.3);
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(evidenceDir, '04-balcony-horizon.png') });
  });

  test('Desktop Evidence: Editorial Sections & Anchor Navigation', async ({ page, isMobile }) => {
    if (isMobile) return;
    test.setTimeout(120000);

    // 5. Materials Section Overhaul (Facade Detail + Tactile Swatches)
    await page.goto('/#/');
    await page.waitForTimeout(600);
    await page.evaluate(() => {
      const el = document.getElementById('vision');
      el?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);
    await expect(page.locator('.material-strip')).toBeVisible();
    await expect(page.locator('text=A tactile palette')).toBeVisible();
    await page.screenshot({ path: path.join(evidenceDir, '05-materials-facade-detail.png') });

    // 6. Residence Collections Editorial Cards with Architectural Stills
    await page.evaluate(() => {
      const el = document.getElementById('residences');
      el?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);
    await expect(page.locator('text=Three ways')).toBeVisible();
    await page.screenshot({ path: path.join(evidenceDir, '06-collections-editorial-cards.png') });

    // 7. Real Amenities Section (Roof Garden, Lounge, Wellness, Arrival)
    await page.evaluate(() => {
      const el = document.getElementById('amenities');
      el?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);
    await expect(page.locator('.amenity-title:has-text("The roof garden")')).toBeVisible();
    await expect(page.locator('.amenity-title:has-text("A considered arrival")')).toBeVisible();
    await page.screenshot({ path: path.join(evidenceDir, '07-amenities-section.png') });

    // 8. District & Location Section with Landmark Cards
    await page.evaluate(() => {
      const el = document.getElementById('location');
      el?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);
    await expect(page.locator('text=A connected neighbourhood')).toBeVisible();
    await page.screenshot({ path: path.join(evidenceDir, '08-district-preview.png') });

    // 8b. Closing Viewing & Architectural Consultation CTA
    await page.evaluate(() => {
      const el = document.getElementById('enquiry');
      el?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);
    await expect(page.locator('text=Arrange a private walkthrough')).toBeVisible();
    await page.screenshot({ path: path.join(evidenceDir, '08b-closing-viewing-cta.png') });

    // 9. Header Anchor Navigation: clicking "Amenities" smoothly lands on #amenities
    await page.goto('/#/');
    await page.waitForTimeout(600);
    await page.click('.desktop-nav button:has-text("Amenities")');
    await page.waitForTimeout(600);
    const amenitiesSection = page.locator('#amenities');
    await expect(amenitiesSection).toBeInViewport();
    await page.screenshot({ path: path.join(evidenceDir, '09-header-amenities-nav.png') });
  });

  test('Desktop Evidence: Eye-Level Show Residence Tour & 3D District Scene', async ({ page, isMobile }) => {
    if (isMobile) return;
    test.setTimeout(120000);

    // 10. Eye-Level Tour: Living Room
    await page.goto('/#/explore/homes/A0801/tour/living');
    await page.waitForTimeout(800);
    await expect(page.locator('text=Skyline Show Residence')).toBeVisible();
    await page.screenshot({ path: path.join(evidenceDir, '10-tour-living-eyelevel.png') });

    // 11. Eye-Level Tour: Upgraded Luxury Bedroom Suite
    await page.click('button:has-text("Primary Bedroom")');
    await page.waitForTimeout(600);
    await expect(page).toHaveURL(/#\/explore\/homes\/A0801\/tour\/bedroom/);
    await page.screenshot({ path: path.join(evidenceDir, '11-tour-bedroom-luxury.png') });

    // 12. Eye-Level Tour: Balcony with Layered Sunset Horizon & Skyline
    await page.click('button:has-text("Balcony")');
    await page.waitForTimeout(600);
    await expect(page).toHaveURL(/#\/explore\/homes\/A0801\/tour\/balcony/);
    await page.screenshot({ path: path.join(evidenceDir, '12-tour-balcony-sunset.png') });

    // 13. Interactive 3D District Scene with Canal, Bridges & Urban Blocks
    await page.goto('/#/explore/district');
    await page.waitForTimeout(800);
    await expect(page.locator('text=The AUREL District')).toBeVisible();
    await page.screenshot({ path: path.join(evidenceDir, '13-district-3d-scene.png') });
  });

  test('Mobile Evidence: Phone Layout Hero & Amenities', async ({ page, isMobile }) => {
    if (!isMobile) return;
    test.setTimeout(120000);

    // Mobile Hero
    await page.goto('/#/');
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(evidenceDir, '14-mobile-hero-3d.png') });

    // Mobile Amenities
    await page.evaluate(() => {
      const el = document.getElementById('amenities');
      el?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(evidenceDir, '15-mobile-amenities.png') });

    // Mobile Drawer Navigation to Amenities
    await page.goto('/#/');
    await page.waitForTimeout(600);
    await page.click('.mobile-toggle');
    await page.waitForTimeout(300);
    await page.click('button:has-text("Amenities"):visible');
    await page.waitForTimeout(600);
    const amenitiesSection = page.locator('#amenities');
    await expect(amenitiesSection).toBeInViewport();
  });

  test('Reduced Motion Mode Verification', async ({ page }) => {
    test.setTimeout(120000);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/#/');
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(evidenceDir, '16-reduced-motion-mode.png') });
  });
});
