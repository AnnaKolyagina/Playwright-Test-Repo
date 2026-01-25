import { Locator } from '@playwright/test';

export class CartItem {
  readonly container: Locator;
  readonly removeButton: Locator;

  constructor(container: Locator) {
    this.container = container;
    // Используем кнопку Remove внутри контейнера по тексту
    this.removeButton = this.container.locator('button:has-text("Remove")');
  }

  async remove(): Promise<void> {
    // Ждём пока кнопка станет видимой
    await this.removeButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.removeButton.click();
  }
}
