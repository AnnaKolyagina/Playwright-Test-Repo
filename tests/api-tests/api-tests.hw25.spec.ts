import { test, expect } from '@playwright/test';

test.describe.serial('Test REST API', () => { //тесты выполняются строго по порядку
  let objectId: number;//объявлена снаружи тестов чтобы все тесты могли ее использовать

  test('POST /objects', async ({ request }) => {
    const response = await request.post('/objects', {
      data: {
        name: 'Test create API object',
        data: { price: 1200 },
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    objectId = body.id;//читаем ответ и сохраняем id в переменную objectId
  });

  test('GET /objects/{id}', async ({ request }) => {
    const response = await request.get(`/objects/${objectId}`);
    expect(response.status()).toBe(200);
  });

  test('PUT /objects/{id}', async ({ request }) => {
    const response = await request.put(`/objects/${objectId}`, {
      data: { name: 'Updated object by PUT' },
    });

    expect(response.status()).toBe(200);
  });

  test('PATCH /objects/{id}', async ({ request }) => {
    const response = await request.patch(`/objects/${objectId}`, {
      data: { data: { price: 500 } },
    });

    expect(response.status()).toBe(200);
  });

  test('DELETE /objects/{id}', async ({ request }) => {
    const response = await request.delete(`/objects/${objectId}`);
    expect(response.status()).toBe(200);
  });
});
