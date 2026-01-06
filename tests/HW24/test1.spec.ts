import { test, expect } from '@playwright/test';

test.skip('check sauce labs backpack page url', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.locator('[data-test="inventory-item-name"]:has-text("Sauce Labs Backpack")').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=5')
});