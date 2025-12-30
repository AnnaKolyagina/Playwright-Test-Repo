// Для сайта https://books-pwakit.appspot.com/ найти:
// 1. Локатор для строки "Search the world's most comprehensive index of full-text books."
// 2. Проверить что текст совпадает с ожидаемым

import { test, expect } from '@playwright/test';

test('test string text is as expected', async ({ page }) => {
  await page.goto('https://books-pwakit.appspot.com');
  const stringText = page.getByText("Search the world's most comprehensive index of full-text books.");
  await expect(stringText).toBeVisible(); 
  await expect(stringText).toHaveText("Search the world's most comprehensive index of full-text books."); 
});
