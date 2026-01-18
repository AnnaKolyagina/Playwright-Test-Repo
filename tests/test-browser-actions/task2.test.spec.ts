// Для сайта https://the-internet.herokuapp.com/windows
// 1. Открыть новую страницу
// 2. Проверить что она открылась и имеет ожидаемый ЮРЛ и тайтл

import { test, expect } from '@playwright/test';

test('new window opens with correct url and title', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/windows');
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    page.getByText('Click Here').click(),
  ]);
  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL('https://the-internet.herokuapp.com/windows/new');
  await expect(newPage).toHaveTitle('New Window');
});
