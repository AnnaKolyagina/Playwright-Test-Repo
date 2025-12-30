// Для сайта https://the-internet.herokuapp.com/hovers
// 1. С помощью указателя мыши навестись на любую из картинок
// 2. Проверить, что ожидаемый текст под картинкой появился

import { test, expect } from '@playwright/test';

test('test hover text is as expected', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/hovers');
  const firstImage = page.locator('.figure').first();
  await firstImage.hover();
  const hoverText = firstImage.locator('h5');
  await expect(hoverText).toBeVisible();
  await expect(hoverText).toHaveText('name: user1');
});