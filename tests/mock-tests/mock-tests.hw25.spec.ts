//Протестировать страницу https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks
//  - написать все тесты, которые считаете нужными
//  - в т.ч. протестировать что на UI корректно отображается информация из запроса если он прошел успешно
//  - в т.ч. протестировать поведение если запрос, отправляемый при нажатии кнопки, возвращается в ошибкой (включая правильную отрисовку сообщения об ошибке)

import { test, expect } from '@playwright/test';

const Base_Url = 'https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks';

const API_Pattern = '**/*?action=getData';//Это шаблон запроса, который мы будем ловить, запрос всегда заканчивается на ?action=getData, **/* — значит «любой домен и любой путь»

test.describe('API mocking', () => {

  test('check abort request → Network error', async ({ page }) => {
    //моки всегда будут написаны в коде ДО самого запроса так как мы здесь говорим плэйрайту слушай запросы и как только услышишь замени на это
    await page.route(API_Pattern, route => route.abort());
    await page.goto(Base_Url);
    await page.click('#fetchBtn');
    await expect(page.locator('#result')).toHaveText('Network error');
    await expect(page.locator('#result')).toHaveClass(/error/);
  });

  test('check continue request → real backend call', async ({ page }) => {
    await page.route(API_Pattern, route => route.continue());//перехватываем запрос, ничего с ним не делаем, отправляем дальше
    await page.goto(Base_Url);
    await page.click('#fetchBtn');
    await expect(page.locator('#result')).not.toHaveText('Loading...');
  });

  test('check success 200', async ({ page }) => {
    await page.goto(Base_Url);
    await page.click('#fetchBtn');
    const result = page.locator('#result');
    await expect(result).toHaveText('Success! Expected data received.');
    await expect(result).toHaveClass(/success/);//Регулярка проверит есть ли слово success где-то в списке классов
  });

  test('check success 201', async ({ page }) => {
    await page.route(API_Pattern, route =>
      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Created' }),//JSON.stringify(...) нужен потому что HTTP-ответ всегда передаёт ТЕКСТ,а не JavaScript-объект.
      })
    );
    await page.goto(Base_Url);
    await page.click('#fetchBtn');
    // status 201 не равен 200 и не >403 → else
    await expect(page.locator('#result')).toHaveText('Status: 201');
  });

  test('check error 400', async ({ page }) => {
    await page.route(API_Pattern, route =>
      route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Bad Request' }),
      })
    );
    await page.goto(Base_Url);
    await page.click('#fetchBtn');
    const result = page.locator('#result');
    await expect(result).toHaveText('Status: 400');
  });

  test('check error 404', async ({ page }) => {
    await page.route(API_Pattern, route =>
      route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Not Found' }),
      })
    );
    await page.goto(Base_Url);
    await page.click('#fetchBtn');
    const result = page.locator('#result');
    await expect(result).toHaveText('Error 404: Not Found');
    await expect(result).toHaveClass(/error/);
  });

  test('check error 500', async ({ page }) => {
    await page.route(API_Pattern, route =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error' }),
      })
    );
    await page.goto(Base_Url);
    await page.click('#fetchBtn');
    const result = page.locator('#result');
    await expect(result).toHaveText(
      'Error 500: Internal Server Error'
    );
    await expect(result).toHaveClass(/error/);
  });

});
