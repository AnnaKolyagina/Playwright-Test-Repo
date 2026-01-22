// Для сайта https://the-internet.herokuapp.com/upload
// 1. Проверить загрузку файла test.txt (любой файл) на сайт

import { test, expect } from '@playwright/test';
import path from 'path';

test('test file upload', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload'); 
  const chooseFile = path.join(__dirname, 'test.txt');
  await page.locator('#file-upload').setInputFiles(chooseFile);
  await page.locator('#file-submit').click();
  await expect(page.locator('#uploaded-files')).toHaveText('test.txt');
})

