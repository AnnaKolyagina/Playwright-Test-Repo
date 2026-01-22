// Для сайта https://the-internet.herokuapp.com/iframe
// 1. Создать тест для проверки кнопок в верхнем меню эдитора (["File", "Edit", "View", "Format"])
// 2. Проверить что кнопки неактивны (disabled)
// 3. Проверить текст в форме ("Your content goes here.")

import { test, expect } from '@playwright/test';

test('test iframe', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/iframe');
  const frameTest = page.frameLocator('#mce_0_ifr');
  const menu = ['File', 'Edit', 'View', 'Format'];
  for (const button of menu) {
    const menuItem = page.getByRole('menuitem', { name: button });
    await expect(menuItem).toBeVisible();
    await expect(menuItem).toBeDisabled(); 
  }
  await expect(frameTest.locator('#tinymce')).toHaveText('Your content goes here.');
});
