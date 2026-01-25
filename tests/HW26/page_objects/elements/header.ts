import { Locator, Page } from "@playwright/test";
import { BurgerMenu } from "./burger-menu";

export class Header {
  private readonly headerContainer: Locator;
  readonly logo: Locator;
  readonly burgerMenu: BurgerMenu;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartItems: Locator;
  private readonly sortByContainer: Locator;
  readonly activeSortOption: Locator;
  readonly sortBy: Locator;
  readonly pageLabel: Locator;


constructor(page: Page) {
  this.headerContainer = page.locator('[data-test="header-container"]');
  this.logo = this.headerContainer.locator('.app-logo');
  this.burgerMenu = new BurgerMenu(page);//это другой page object, header просто использует его
  this.shoppingCartLink = this.headerContainer.locator('[data-test="shopping-cart-link"]');
  this.shoppingCartItems = this.headerContainer.locator('[data-test="shopping-cart-badge"]');
  this.sortByContainer = this.headerContainer.locator('.select_container');
  this.activeSortOption = this.sortByContainer.locator('[data-test="active-option"]');
  this.sortBy = this.sortByContainer.locator('[data-test="product-sort-container"]');
  this.pageLabel = this.headerContainer.locator('[data-test="title"]');   
}

//   async isLogoVisible(): Promise<boolean> {
//     return await this.logo.isVisible();
// }

//   async openBurgerMenu() {
//     await this.burgerMenu.open();
//   }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

//   async getCartItemsCount(): Promise<number> {
//     if (await this.shoppingCartItems.isVisible()) {
//       const text = await this.shoppingCartItems.textContent();
//       return Number(text);
//     }
//     return 0;
//   }

//   async getActiveSortOption(): Promise<string> {
//     return (await this.activeSortOption.textContent()) ?? '';
//   }

  async selectSort(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortBy.selectOption(option);
  }

//   async getPageLabel(): Promise<string> {
//     return (await this.pageLabel.textContent()) ?? '';
//   }
}