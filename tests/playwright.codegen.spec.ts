

import { test, expect } from '@playwright/test';

test('add to cart test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/', {timeout: 60_000, waitUntil: "load"});
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  const addToCartText = await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').textContent();
  expect(addToCartText).toEqual('Add to cart');
  await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toContainText('Add to cart');
});


test('choose sauce labs bile light test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="item-0-title-link"]').click();
});

test('sort product list by price asc test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="item-0-title-link"]').click();
  await page.goto('https://www.saucedemo.com/inventory.html');
  await page.getByText('Name (A to Z)Name (A to Z)').click();
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
});


