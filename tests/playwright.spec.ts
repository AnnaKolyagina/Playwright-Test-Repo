import { test, expect } from '@playwright/test';

test ('main page is loading test', async({page}) => {
  const response = await page.request.get('https://www.saucedemo.com/');
  await expect(response).toBeOK();
});

test('main page title test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('main page username field is present test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const userNameField = page.locator('#user-name');
  await expect(userNameField).toHaveCount(1);
});

test('main page password field is present test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const passwordField = page.locator('#password');
  await expect(passwordField).toHaveCount(1);
});

test('main page login button is present test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const loginButton = page.locator('#login-button');
  await expect(loginButton).toHaveCount(1);
});


