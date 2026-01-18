// Для сайта https://the-internet.herokuapp.com/key_presses
// 1. Проверить нажатие клавиши "Control"
// 2. Проверить что отображается последняя буква вашего имени после ввода через клавиатуру

import { test, expect } from '@playwright/test';

test('test keyboard input shows correct keys', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/key_presses');
  const input = page.locator('#target');
  const result = page.locator('#result');
  await input.click();
  await page.keyboard.press('Control');
  await expect(result).toHaveText('You entered: CONTROL');
  await input.click();
  await page.keyboard.type('Hanna');
  await expect(result).toHaveText('You entered: A');
});