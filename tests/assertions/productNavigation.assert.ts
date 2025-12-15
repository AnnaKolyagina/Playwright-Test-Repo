import { expect, Page } from '@playwright/test';

export async function openAndReturn(
  page: Page,
  productName: string) {
  await expect(page).toHaveURL(/inventory.html/);
  await page.getByText(productName).click();
  await expect(page).toHaveURL(/inventory-item.html/);
  await expect(page.getByText(productName)).toBeVisible();
  await page.locator('#back-to-products').click();
  await expect(page).toHaveURL(/inventory.html/);
}
