import { Page, Locator } from '@playwright/test';
import { CartItem } from '../elements/cart_item';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]'); 
  }

  async removeItemByIndex(index: number): Promise<void> {
    const itemLocator = this.cartItems.nth(index);
    const cartItem = new CartItem(itemLocator);
    await cartItem.remove();
  }

  async getItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/cart.html');
  }

   async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
