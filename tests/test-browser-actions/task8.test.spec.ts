// Для сайта https://the-internet.herokuapp.com/javascript_alerts
// 1. Вызвать JS confirm через соответствующую опцию (проверить что алерт появился)
// 2. Закрыть его через accept/dismiss и проверить результат

import { test, expect } from '@playwright/test';

test.use({ browserName: 'chromium' }); //dialogs do not work properly with webkit, so for this test it is necessary to use any other browser
test('dismiss js confirm dialog', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  page.once('dialog', async dialog => {
    await dialog.dismiss();
  });
  await page.getByText('Click for JS Confirm').click();
  await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
});