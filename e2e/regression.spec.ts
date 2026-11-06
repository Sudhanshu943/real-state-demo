import { test, expect } from '@playwright/test';

test.describe('Architectural & Interior Verification Regressions', () => {
  test('R01: Successfully rendered interior tour with observable scene readiness and non-empty frame buffer', async ({ page }) => {
    test.setTimeout(45000);
    await page.goto('/#/explore/homes/A0801/tour/living');

    // 1. Observable Scene Readiness: Wait for Three.js render loop to confirm room is mounted and rendered
    await page.waitForFunction(() => {
      const c = document.querySelector('canvas');
      if (!c) return false;
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      if (!gl || gl.isContextLost()) return false;
      return (
        c.dataset.sceneReady === 'true' &&
        c.dataset.activeRoom === 'living' &&
        c.width > 300 &&
        c.height > 150
      );
    }, undefined, { timeout: 25000 });

    // 2. Plant Asset Status: Wait for loaded photogrammetry GLB model
    await page.waitForFunction(() => {
      const c = document.querySelector('canvas');
      return c && c.dataset.plantStatus === 'glb';
    }, undefined, { timeout: 20000 });

    const plantStatus = await page.evaluate(() => document.querySelector('canvas')?.dataset.plantStatus);
    expect(plantStatus).toBe('glb');

    // 3. Canvas Framebuffer: Capture canvas-only screenshot; verify substantial rendered payload (>100KB)
    const canvasScreenshot = await page.locator('canvas').screenshot();
    expect(canvasScreenshot.length).toBeGreaterThan(100000);

    // 4. Client HUD: Verify residence context and room selectors
    await expect(page.locator('text=Skyline Show Residence')).toBeVisible();
    await expect(page.locator('button:has-text("Living Room")')).toBeVisible();
  });

  test('R02: Plant asset failure produces local fallback without blanking interior room', async ({ page }) => {
    test.setTimeout(45000);

    // Deliberately intercept and fail GLB asset request
    await page.route('**/potted_plant_01.glb', (route) => {
      route.abort('failed');
    });

    await page.goto('/#/explore/homes/A0801/tour/living');

    // Observable Scene Readiness: Scene renders with local fallback despite asset network failure
    await page.waitForFunction(() => {
      const c = document.querySelector('canvas');
      if (!c) return false;
      return (
        c.dataset.sceneReady === 'true' &&
        c.dataset.activeRoom === 'living' &&
        c.dataset.plantStatus === 'fallback' &&
        c.width > 300
      );
    }, undefined, { timeout: 25000 });

    const plantStatus = await page.evaluate(() => document.querySelector('canvas')?.dataset.plantStatus);
    expect(plantStatus).toBe('fallback');

    // Canvas renders successfully with local procedural fallback (>100KB)
    const canvasScreenshot = await page.locator('canvas').screenshot();
    expect(canvasScreenshot.length).toBeGreaterThan(100000);

    // Room controls and navigation remain fully interactive
    await expect(page.locator('button:has-text("Primary Bedroom")')).toBeVisible();
    await page.click('button:has-text("Primary Bedroom")');
    await expect(page).toHaveURL(/#\/explore\/homes\/A0801\/tour\/bedroom/);
  });

  test('R03: Tour rooms switch reliably with observable readiness across living, bedroom, and balcony', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/#/explore/homes/A0801/tour/living');

    // 1. Initial Living Room ready
    await page.waitForFunction(() => {
      const c = document.querySelector('canvas');
      return c && c.dataset.sceneReady === 'true' && c.dataset.activeRoom === 'living';
    }, undefined, { timeout: 25000 });

    // 2. Switch to Bedroom
    await page.click('button:has-text("Primary Bedroom")');
    await expect(page).toHaveURL(/#\/explore\/homes\/A0801\/tour\/bedroom/);
    await page.waitForFunction(() => {
      const c = document.querySelector('canvas');
      return c && c.dataset.sceneReady === 'true' && c.dataset.activeRoom === 'bedroom';
    }, undefined, { timeout: 25000 });
    const bedroomScreenshot = await page.locator('canvas').screenshot();
    expect(bedroomScreenshot.length).toBeGreaterThan(80000);

    // 3. Switch to Balcony
    await page.click('button:has-text("Balcony")');
    await expect(page).toHaveURL(/#\/explore\/homes\/A0801\/tour\/balcony/);
    await page.waitForFunction(() => {
      const c = document.querySelector('canvas');
      return c && c.dataset.sceneReady === 'true' && c.dataset.activeRoom === 'balcony';
    }, undefined, { timeout: 25000 });
    const balconyScreenshot = await page.locator('canvas').screenshot();
    expect(balconyScreenshot.length).toBeGreaterThan(80000);

    // 4. Switch back to Living Room
    await page.click('button:has-text("Living Room")');
    await expect(page).toHaveURL(/#\/explore\/homes\/A0801\/tour\/living/);
    await page.waitForFunction(() => {
      const c = document.querySelector('canvas');
      return c && c.dataset.sceneReady === 'true' && c.dataset.activeRoom === 'living';
    }, undefined, { timeout: 25000 });

    // Confirm WebGL context is healthy and active
    const isContextActive = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      const gl = canvas?.getContext('webgl2') || canvas?.getContext('webgl');
      return !!gl && !gl.isContextLost();
    });
    expect(isContextActive).toBe(true);
  });

  test('R04: Story visibility and interaction at transition boundaries', async ({ page }) => {
    test.setTimeout(45000);
    await page.goto('/#/');
    await page.waitForSelector('.hero-masthead');

    // 1. Initial Hero State (s = 0): Hero is visible, Beat 2 is completely hidden and inert
    const heroVisible = await page.locator('.hero-masthead').isVisible();
    expect(heroVisible).toBe(true);

    const beat2HiddenAtStart = await page.evaluate(() => {
      const cards = document.querySelectorAll('.story-card');
      const card2 = cards[0] as HTMLElement;
      return !card2 || card2.style.display === 'none' || card2.hasAttribute('inert');
    });
    expect(beat2HiddenAtStart).toBe(true);

    // 2. Scroll into Beat 2 (s ≈ 0.33): Hero clears completely, Level 8 card is visible and active
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 1.0, behavior: 'instant' });
      window.dispatchEvent(new Event('scroll'));
    });

    await page.waitForFunction(() => {
      const masthead = document.querySelector('.hero-masthead') as HTMLElement;
      return !masthead || masthead.style.display === 'none' || masthead.hasAttribute('inert');
    }, undefined, { timeout: 15000 });

    await page.waitForFunction(() => {
      const cards = document.querySelectorAll('.story-card');
      const card2 = cards[0] as HTMLElement;
      return card2 && card2.style.display !== 'none' && !card2.hasAttribute('inert');
    }, undefined, { timeout: 15000 });

    // 3. Reverse scroll back to 0: Hero cleanly restores, Beat 2 re-hides
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      window.dispatchEvent(new Event('scroll'));
    });

    await page.waitForFunction(() => {
      const masthead = document.querySelector('.hero-masthead') as HTMLElement;
      return masthead && masthead.style.display !== 'none' && !masthead.hasAttribute('inert');
    }, undefined, { timeout: 15000 });

    const heroRestored = await page.locator('.hero-masthead').isVisible();
    expect(heroRestored).toBe(true);
  });

  test('R05: Tour exit and re-entry lifecycle preserves WebGL rendering', async ({ page }) => {
    test.setTimeout(75000);
    await page.goto('/#/explore/homes/A0801/tour/living');

    // 1. Wait for living tour readiness
    await page.waitForFunction(() => {
      const c = document.querySelector('canvas');
      return c && c.dataset.sceneReady === 'true' && c.dataset.activeRoom === 'living';
    }, undefined, { timeout: 25000 });

    // 2. Exit Tour
    await page.click('button:has-text("Exit Tour")');
    await expect(page).toHaveURL(/#\/explore\/homes\/A0801/);

    // 3. Re-enter Tour
    await page.goto('/#/explore/homes/A0801/tour/living');
    await page.waitForFunction(() => {
      const c = document.querySelector('canvas');
      return c && c.dataset.sceneReady === 'true' && c.dataset.activeRoom === 'living';
    }, undefined, { timeout: 25000 });

    const canvasScreenshot = await page.locator('canvas').screenshot();
    expect(canvasScreenshot.length).toBeGreaterThan(100000);
  });

  test('R06: Homepage interior handoff beat renders living room geometry', async ({ page }) => {
    test.setTimeout(75000);
    await page.goto('/#/');

    // Scroll to Chapter 3 (Living Salon at ~0.65 progress)
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 1.7, behavior: 'instant' });
      window.dispatchEvent(new Event('scroll'));
    });
    await page.waitForTimeout(800);

    // Wait for homepage scene readiness in living room interior mode
    await page.waitForFunction(() => {
      const c = document.querySelector('canvas');
      return c && c.dataset.sceneReady === 'true' && c.dataset.activeRoom === 'living';
    }, undefined, { timeout: 25000 });

    const canvasScreenshot = await page.locator('canvas').screenshot();
    expect(canvasScreenshot.length).toBeGreaterThan(80000);
  });

  test('R07: Exterior botanical assets load or fall back seamlessly without blanking arrival plaza', async ({ page }) => {
    test.setTimeout(75000);

    // Intercept and abort botanical GLB models to test robust fallback
    await page.route('**/tree_small_02.glb', (route) => route.abort('failed'));
    await page.route('**/shrub_01.glb', (route) => route.abort('failed'));

    await page.goto('/#/');

    // Verify scene readiness with local procedural botanical fallback
    await page.waitForFunction(() => {
      const c = document.querySelector('canvas');
      if (!c) return false;
      return (
        c.dataset.sceneReady === 'true' &&
        c.dataset.activeRoom === 'exterior' &&
        c.dataset.exteriorVegetation === 'fallback'
      );
    }, undefined, { timeout: 25000 });

    const vegetationStatus = await page.evaluate(() => document.querySelector('canvas')?.dataset.exteriorVegetation);
    expect(vegetationStatus).toBe('fallback');

    // Canvas renders successfully with architectural procedural fallback (>100KB)
    const canvasScreenshot = await page.locator('canvas').screenshot();
    expect(canvasScreenshot.length).toBeGreaterThan(100000);

    // Hero actions remain visible and interactive
    await expect(page.locator('a:has-text("Explore Building")')).toBeVisible();
    await expect(page.locator('a:has-text("View Level 8")')).toBeVisible();
  });

  test('R08: Mobile hero layout maintains badge clearance, CTA visibility, and zero horizontal overflow across 360px, 390px, and 430px', async ({ page }) => {
    test.setTimeout(60000);

    const mobileViewports = [
      { width: 360, height: 740 },
      { width: 390, height: 844 },
      { width: 430, height: 932 }
    ];

    for (const vp of mobileViewports) {
      await page.setViewportSize(vp);
      await page.goto('/#/');

      // Wait for canvas readiness
      await page.waitForFunction(() => {
        const c = document.querySelector('canvas');
        return c && c.dataset.sceneReady === 'true';
      }, undefined, { timeout: 25000 });

      // 1. Verify zero horizontal overflow
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth - window.innerWidth;
      });
      expect(overflow).toBeLessThanOrEqual(1);

      // 2. Verify story badge clears fixed header
      const headerBox = await page.locator('header.site-header').boundingBox();
      expect(headerBox).not.toBeNull();
      const badge = page.locator('text=01/04').first();
      await expect(badge).toBeVisible();
      const badgeBox = await badge.boundingBox();
      expect(badgeBox).not.toBeNull();
      expect(badgeBox!.y).toBeGreaterThanOrEqual(headerBox!.height);

      // 3. Verify CTAs are visible in the viewport
      const exploreBtn = page.locator('a:has-text("Explore Building")');
      await expect(exploreBtn).toBeVisible();
      const exploreBox = await exploreBtn.boundingBox();
      expect(exploreBox).not.toBeNull();
      expect(exploreBox!.y).toBeLessThan(vp.height);

      const level8Btn = page.locator('a:has-text("View Level 8")');
      await expect(level8Btn).toBeVisible();
      const level8Box = await level8Btn.boundingBox();
      expect(level8Box).not.toBeNull();
      expect(level8Box!.y).toBeLessThan(vp.height);

      // 4. Verify mobile menu button is operational
      const menuBtn = page.locator('button[aria-label*="navigation" i], button[aria-label*="menu" i]').first();
      await expect(menuBtn).toBeVisible();
    }
  });
});
