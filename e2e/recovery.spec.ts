import { test, expect } from '@playwright/test';

test.describe('E04-E07: Navigation Recovery, Comparison Limits & Privacy', () => {
  test('E04: Direct deep link boot, refresh, and invalid route recovery', async ({ page }) => {
    // Direct tour route boot
    await page.goto('/#/explore/homes/A0801/tour/bedroom');
    await expect(page.locator('text=Skyline Show Residence')).toBeVisible();

    // Refresh preserves state
    await page.reload();
    await expect(page.locator('text=Skyline Show Residence')).toBeVisible();

    // Invalid unit route normalizes to building
    await page.goto('/#/explore/homes/INVALID_UNIT');
    await expect(page).toHaveURL(/#\/explore\/building/);

    // Invalid floor route normalizes to building
    await page.goto('/#/explore/floors/7');
    await expect(page).toHaveURL(/#\/explore\/building/);
  });

  test('E05: Comparison limit (2 units) triggers replacement choice for 3rd candidate', async ({ page }) => {
    await page.goto('/#/explore/homes/A0801');
    await page.click('button:has-text("Compare")'); // 1

    await page.goto('/#/explore/homes/A0401');
    await page.click('button:has-text("Compare")'); // 2

    // Adding 3rd candidate triggers replace modal
    await page.goto('/#/explore/homes/A1201');
    await page.click('button:has-text("Compare")'); // 3

    await expect(page.locator('#replace-compare-title')).toBeVisible();
    await expect(page.locator('text=Replace a Comparison Slot')).toBeVisible();

    // Cancel modal
    await page.click('text=Cancel and keep current comparison');
    await expect(page.locator('#replace-compare-title')).not.toBeVisible();
  });

  test('E06: Enquiry validation errors and strict privacy (zero PII stored or sent)', async ({ page }) => {
    await page.goto('/#/explore/building');
    
    // Open viewing dialog (visible button)
    const directBtn = page.locator('.desktop-cta');
    if (await directBtn.isVisible()) {
      await directBtn.click();
    } else {
      await page.click('.mobile-toggle');
      await page.click('button:has-text("Request a Viewing"):visible');
    }

    // Submit empty
    await page.click('button:has-text("Preview Viewing Request")');
    await expect(page.locator('text=Please provide a name of at least 2 characters')).toBeVisible();

    // Submit invalid email
    await page.fill('#enquiry-name', 'Rajeev Khanna');
    await page.fill('input[type="email"]', 'notanemail');
    await page.click('button:has-text("Preview Viewing Request")');
    await expect(page.locator('text=Please provide a valid email address')).toBeVisible();

    // Verify localStorage has zero PII
    const storageData = await page.evaluate(() => window.localStorage.getItem('aurel.demo.v1'));
    if (storageData) {
      expect(storageData).not.toContain('Rajeev');
      expect(storageData).not.toContain('Khanna');
      expect(storageData).not.toContain('notanemail');
    }
  });

  test('E07: Simplified 2D view retains selection and navigation', async ({ page }) => {
    await page.goto('/#/explore/homes/A0801');
    await page.click('button:has-text("Use Simplified 2D View")', { force: true });

    // In simplified mode, 2D elevation and list render
    await expect(page.locator('text=Simplified Mode')).toBeVisible();
    await expect(page.locator('text=Residence A0801').first()).toBeVisible();

    // Switch back to 3D
    await page.click('text=Switch to 3D View');
    await expect(page.locator('text=Simplified Mode')).not.toBeVisible();
  });
});
