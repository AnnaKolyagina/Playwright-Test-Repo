import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';
// 2. Написать 3-5 теста с использованием разных типов Playwright assertions (expect)
// 3. Добавить assertions с проверкой скриншотов
// 4. Добавить один кастомный assertion
// 5. Добавить HTML репортер
// 6. В один из тестов добавить tracing
// 7. Написать один тест так, чтобы он был failed
// 8. Открыть режим дебага, проанализировать тест и сделать скриншот этапа на котором тест зафейлился
// 9. Пофиксить зафейленный тест

//ниже написаны 4 теста на использование разных типов assertions:
//тест №1
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory.html/);
});

//тест №2
test('sort Z-A test', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption('za');
  const names = await page.locator('.inventory_item_name').allTextContents();
  const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
  expect(names).toEqual(sortedNames);
});

//тест №3
test('navigate to burger menu test', async ({ page }) => {
  await page.locator('#react-burger-menu-btn').click();
  const menuItems = page.locator('.bm-item-list a');
  await expect(menuItems).toHaveCount(4);
  const menuText = await menuItems.allTextContents();
  const expectedItems = [
    'All Items',
    'About',
    'Logout',
    'Reset App State',
  ];
  expect(menuText).toEqual(expectedItems);
});

//тест №4
test('check item\'s title test', async ({ page }) => {
  await page.getByText('Sauce Labs Fleece Jacket').click();
  const itemTitle = await page.locator('[data-test="inventory-item-name"]').textContent();
  expect(itemTitle).toBe('Sauce Labs Fleece Jacket');
});

//проверка скриншотов
test('burger menu screenshot test', async ({ page }) => {
  await page.locator('#react-burger-menu-btn').click();
  const burgerMenu = page.locator('.bm-menu-wrap');
  await expect(burgerMenu).toBeVisible();
  await expect(page).toHaveScreenshot('burger-menu.png');
});

//кастомный асерт
import { openAndReturn } from './assertions/productNavigation.assert';

test('return back from item page test', async ({ page }) => {
  await openAndReturn(
    page,
    'Sauce Labs Onesie'
  );
});

//этот тест используется для tracing, debug, failure, failure fix:
test('sort Z-A neg test', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption('za');
  const names = await page.locator('.inventory_item_name').allTextContents();
  const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
  expect(names).not.toEqual(sortedNames);
});

//note: этот тест я не фиксила так как есть такой же но рабоботающий тест выше и плюс для наглядности





