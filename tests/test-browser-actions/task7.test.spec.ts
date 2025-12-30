// Для сайта https://the-internet.herokuapp.com/download
// 1. Скачать файл SomeFile.txt
// 2. Проверить что его содержимое это "blah"

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('test file download and content', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/download');
  const downloadPromise = page.waitForEvent('download');
  await page.getByText('SomeFile.txt').click();
  const download = await downloadPromise;
  const filePath = path.join(__dirname, 'SomeFile.txt');
  await download.saveAs(filePath);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  expect(fileContent).toBe('blah');
});


