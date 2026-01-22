// Для сайта https://the-internet.herokuapp.com/drag_and_drop
// 1. Перетащить элемент А на элемент В
// 2. Проверить что они поменялись местами

import { test, expect } from '@playwright/test';

test('test drag abd drop', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
  const source = page.locator('#column-a');
  const target = page.locator('#column-b');
  await source.dragTo(target);
  await expect(source.locator('header')).toHaveText('B');
  await expect(target.locator('header')).toHaveText('A');
})