// Для сайта https://the-internet.herokuapp.com/tables
// 1. Создать скрипт на получение заголовка сайта (title) 
// 2. Запустить скрипт через page.evaluate()
// 3. Проверить что полученные title совпадает с ожидаемым

import { test, expect } from '@playwright/test';

test('test evaluate', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/tables');
  const titleActual = await page.evaluate(() => document.title);
  expect(titleActual).toBe('The Internet');
})