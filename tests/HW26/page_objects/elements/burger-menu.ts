import { Locator, Page } from "@playwright/test";

export class BurgerMenu {
  private readonly containerLocator: Locator;
  private readonly closeMenuButton: Locator;
  readonly burgerMenuButton: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;
  
  constructor(page: Page) {
    this.containerLocator = page.locator('.bm-menu-wrap');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.closeMenuButton = this.containerLocator.locator('.bm-cross-button');
    this.allItemsLink = this.containerLocator.locator('[data-test="inventory-sidebar-link"]');
    this.aboutLink = this.containerLocator.locator('[data-test="about-sidebar-link"]');
    this.logoutLink = this.containerLocator.locator('[data-test="logout-sidebar-link"]');
    this.resetAppStateLink = this.containerLocator.locator('[data-test="reset-sidebar-link"]');
  }

  async open() {
    await this.burgerMenuButton.click();
  }

  async close() {
    await this.closeMenuButton.click();
  }

//   async goToAllItems() {
//     await this.allItemsLink.click();
//   }

//   async goToAbout() {
//     await this.aboutLink.click();
//   }

  async logout() {
    await this.logoutLink.click();
  }

//   async resetAppState() {
//     await this.resetAppStateLink.click();
//   }
}