//Протестировать страницу https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks
//  - написать все тесты, которые считаете нужными
//  - в т.ч. протестировать что на UI корректно отображается информация из запроса если он прошел успешно
//  - в т.ч. протестировать поведение если запрос, отправляемый при нажатии кнопки, возвращается в ошибкой (включая правильную отрисовку сообщения об ошибке)

import { test, expect } from '@playwright/test';

test('check that page is loaded successfully', async ({ page }) => {
  const response1 = await page.request.get('https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks');
  await expect(response1).toBeOK();
});

test('check html page title', async ({ page }) => {
  await page.goto('https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks');
  await expect(page).toHaveTitle(/QA Practice: Mocking/);
});

test('check h3 title text', async ({ page }) => {
  await page.goto('https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks');  
  const h3Title = await page.locator('h3').textContent();
  expect(h3Title).toBe('Mock trainer');
});

test('check success message text', async ({ page }) => {
  await page.goto('https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks');
  await page.locator('#fetchBtn').click();
  const successMessage = page.locator('#result'); 
  await expect(successMessage).toHaveText('Success! Expected data received.');
});

test('check mocked success message', async ({ page }) => {
    await page.goto('https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks');
    // Мокируем успешный ответ до клика
    await page.route('https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 1,
          name: 'Test Mocked Item',
          status: 'active',
        }),
      });
    });
    await page.locator('#fetchBtn').click();
    const result = page.locator('#result');
    // Ждём, пока UI покажет сообщение об успехе
    await expect(result).toHaveText(/Success! Expected data received./);
  });

test('check mocked error message text and data', async ({ page }) => {
  await page.goto('https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks');
  // Мокируем ответ с ошибкой до клика
  await page.route('https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Network Error' }),
      });
    });
  await page.locator('#fetchBtn').click();
  const result = page.locator('#result');
  // Проверяем, что сообщение об успехе не отображается
  await expect(page.getByText('Success! Expected data received.')).not.toBeVisible();
  });

 

