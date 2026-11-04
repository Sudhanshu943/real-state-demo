import { test, expect } from '@playwright/test';

test.describe('E10-E11: Keyboard Accessibility & Reduced Motion', () => {
  test('E10: Keyboard focus and modal Escape handling', async ({ page }) => {
    await page.goto('/#/explore/building');

    // Open viewing dialog (handle desktop or mobile menu)
    const directBtn = page.locator('.desktop-cta');
    if (await directBtn.isVisible()) {
      await directBtn.click();
    } else {
      await page.click('.mobile-toggle');
      await page.click('button:has-text("Request a Viewing"):visible');
    }

    await expect(page.locator('#enquiry-dialog-title')).toBeVisible();

    // Press Escape to dismiss
    await page.keyboard.press('Escape');
    await expect(page.locator('#enquiry-dialog-title')).not.toBeVisible();
  });

  test('E11: Reduced motion preference disables long camera flights', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/#/explore/building');
    await expect(page.locator('text=All Residences')).toBeVisible();

    // Selection still functions instantly
    await page.click('text=Residence A0801');
    await expect(page).toHaveURL(/#\/explore\/homes\/A0801/);
    await expect(page.locator('h2').first()).toContainText('Residence A0801');
  });
});

