import { test, expect } from '@playwright/test';

test('check that problem user has empty cart @problem', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('.cart_item')).toHaveCount(0);
});