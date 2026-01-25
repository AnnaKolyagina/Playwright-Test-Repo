import { Page } from '@playwright/test';
import { BaseLoginPage } from './page_base_log_in';
import { InventoryItem } from '../elements/inventory_item';

export class InventoryPage extends BaseLoginPage {

  constructor(page: Page) {
    super(page, 'https://www.saucedemo.com/inventory.html');
  }

  get inventoryItems() {
    return this.page.locator('[data-test="inventory-item"]');
  }

  async getInventoryItemsCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async getItemsInCartCount(): Promise<number> {
  return await this.page.locator('button:has-text("Remove")').count();
}

  async getItemNameByIndex(index: number): Promise<string> {
  return (await this.inventoryItems
    .nth(index)
    .locator('[data-test="inventory-item-name"]')
    .textContent()) ?? '';
}

  async addAllToCart(): Promise<void> {
    const count = await this.inventoryItems.count();

    for (let i = 0; i < count; i++) {
      const item = new InventoryItem(this.inventoryItems.nth(i));
      await item.addToCart();
    }
  }
}
