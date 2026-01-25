import { Locator, expect } from "@playwright/test";

export class InventoryItem {
  readonly container: Locator;
  readonly addToCartButton: Locator;

  constructor(container: Locator) {
    this.container = container;
    this.addToCartButton = this.container.locator('.pricebar button');
  }

  async isInCart(): Promise<boolean> {
    await expect(this.addToCartButton).toHaveCount(1);
    const text = await this.addToCartButton.textContent();
    return text?.trim().toLowerCase() === 'remove';
  }

  async addToCart(): Promise<void> {
    if (!(await this.isInCart())) {
      await this.addToCartButton.click();
    }
  }
}

  
//пояснения с лекции: container ?? page - означает:
// Если мы передали container → ищем элемент внутри этого контейнера
// Если не передали → ищем первый элемент [data-test="inventory-item"] на всей странице
// Сохраняем найденный локатор в this.container, чтобы дальше искать внутри него остальные элементы

  
//   async clickPicture() {
//     await this.itemPicture.click();
//   }

//   async getName(): Promise<string> {
//     return (await this.itemName.textContent())?.trim() ?? '';
//   }

//   async getDescription(): Promise<string> {
//     return (await this.itemDescription.textContent())?.trim() ?? '';
//   }

//   async getPrice(): Promise<string> {
//     return (await this.itemPrice.textContent())?.trim() ?? '';
//   }

//   async isVisible(): Promise<boolean> {
//     return await this.container.isVisible();
//   }

//   async removeFromCart() {
//     if (await this.isInCart()) {
//       await this.addToCartButton.click();
//     }
//   }

