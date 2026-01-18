import { test, expect } from '@playwright/test';

const urlArray = [
  '/inventory.html',
  '/cart.html',
  '/checkout-step-one.html',
];

test.describe('check problem user can see pages and logo', () => {
  for (const url of urlArray) {
    test(`page ${url} test`, async ({ page }) => {
      await page.goto(`https://www.saucedemo.com${url}`);
      const logo = page.locator('.app_logo');
      await expect(logo).toBeVisible();
      await expect(logo).toHaveText('Swag Labs');
    });
  }
});
