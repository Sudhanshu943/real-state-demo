import { test, expect } from '@playwright/test';

test.describe('E01-E03: Core Client Journeys & Status Rules', () => {
  test('E01: Complete client presentation path (Home -> District -> Floor 8 -> A0801 -> Tour -> Save -> Compare -> Viewing Preview)', async ({ page }) => {
    test.setTimeout(120000);
    // 1. Open Homepage
    await page.goto('/#/');
    await expect(page.locator('h1')).toContainText('A different');
    await expect(page.locator('h1 em')).toContainText('On home.');

    // 2. Navigate to Explorer
    await page.click('text=Explore Building');
    await expect(page).toHaveURL(/#\/explore\/building/);

    // 3. Select Floor 8
    await page.locator('button:has-text("Level 8")').first().click();
    await expect(page).toHaveURL(/#\/explore\/floors\/8/);

    // 4. Select Residence A0801
    await page.locator('text=Residence A0801').first().click();
    await expect(page).toHaveURL(/#\/explore\/homes\/A0801/);
    await expect(page.locator('h2').first()).toContainText('Residence A0801');
    await expect(page.locator('text=192 m²').first()).toBeVisible();

    // 5. Open Schematic Plan Tab
    await page.click('button:has-text("Schematic Plan")');
    await expect(page.locator('text=Schematic concept plan')).toBeVisible();

    // 6. Enter Show Residence 3D Tour
    await page.click('button:has-text("Overview")');
    await page.click('button:has-text("Enter 3D")');
    await expect(page).toHaveURL(/#\/explore\/homes\/A0801\/tour\/living/);
    await expect(page.locator('text=Skyline Show Residence')).toBeVisible();
    await expect(page.locator('text=Representative Skyline interior')).toBeVisible();

    // 7. Tour Room Switching (Bedroom -> Balcony)
    await page.click('button:has-text("Primary Bedroom")');
    await expect(page).toHaveURL(/#\/explore\/homes\/A0801\/tour\/bedroom/);

    await page.click('button:has-text("Balcony")');
    await expect(page).toHaveURL(/#\/explore\/homes\/A0801\/tour\/balcony/);

    // 8. Exit Tour back to A0801
    await page.click('button:has-text("Exit Tour")');
    await expect(page).toHaveURL(/#\/explore\/homes\/A0801/);

    // 9. Save Residence A0801
    await page.locator('button:has-text("Save Residence")').first().click();
    await expect(page.locator('button:has-text("Saved")').first()).toBeVisible();

    // 10. Add A0401 to Compare
    await page.click('button:has-text("Compare")'); // compares A0801
    await page.goto('/#/explore/homes/A0401');
    await page.click('button:has-text("Compare")'); // compares A0401

    // 11. Open Comparison
    await page.goto('/#/compare');
    await expect(page.locator('h1')).toContainText('Compare Residences (2/2)');
    await expect(page.locator('h3:has-text("Residence A0801")')).toBeVisible();
    await expect(page.locator('h3:has-text("Residence A0401")')).toBeVisible();

    // 12. Open Contextual Viewing Request for Both
    await page.click('text=Request Details for Both Homes');
    await expect(page.locator('#enquiry-dialog-title')).toContainText('Request a Private Viewing');
    await expect(page.locator('text=Residence A0801').first()).toBeVisible();
    await expect(page.locator('text=Residence A0401').first()).toBeVisible();

    // 13. Fill and Preview Form
    await page.fill('#enquiry-name', 'Devrath Oberoi');
    await page.fill('input[type="email"]', 'devrath@example.com');
    const submitBtn = page.locator('button:has-text("Preview Viewing Request")');
    await submitBtn.click({ force: true });

    // 14. Verify Honest Confirmation
    await expect(page.locator('#enquiry-dialog-title')).toContainText('Viewing Request Preview');
    await expect(page.locator('text=This is a concept demonstration; nothing has been sent or booked')).toBeVisible();
    await expect(page.locator('text=Devrath Oberoi')).toBeVisible();

    // 15. Close preview and ensure memory purges
    await page.click('button:has-text("Close and Clear Preview")');
    await expect(page.locator('#enquiry-dialog-title')).not.toBeVisible();
  });

  test('E02: Direct residence shortcut and Garden dimensions', async ({ page }) => {
    await page.goto('/#/explore/homes/A0401');
    await expect(page.locator('h2')).toContainText('Residence A0401');
    // Garden internal area is 160m², terrace 24m²
    await expect(page.locator('text=160 m²')).toBeVisible();
    await expect(page.locator('text=24 m²')).toBeVisible();
  });

  test('E03: Status copy for Reserved and Sold units', async ({ page }) => {
    // Reserved A0402
    await page.goto('/#/explore/homes/A0402');
    await expect(page.locator('text=RESERVED')).toBeVisible();
    await expect(page.locator('button:has-text("Ask about availability")')).toBeVisible();

    // Sold A0802
    await page.goto('/#/explore/homes/A0802');
    await expect(page.locator('text=SOLD')).toBeVisible();
    await expect(page.locator('button:has-text("Request similar homes")')).toBeVisible();
  });
});
