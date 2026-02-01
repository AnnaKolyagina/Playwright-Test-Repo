//Написать Page Object Model для https://www.saucedemo.com/ 
//(как минимум страниц: login, inventory, cart, checkout-step-one)
//для каждой страницы написать пару тестов, включая тесты футера и хэдера на тех страницах, где они есть

//import { test, expect } from '@playwright/test';
import { LoginPage } from './page_objects/pages/page_login';
import { InventoryPage } from './page_objects/pages/page_inventory';
import { CartPage } from './page_objects/pages/page_cart';
import { CheckoutInfoPage } from './page_objects/pages/page_checkout';
import { test, expect } from '../fixtures';

test.describe('SauceDemo Tests Page Objects', () => {
  const validUser = { username: 'standard_user', password: 'secret_sauce' };

test('Check successful login using FooterLoginPage credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  const footer = loginPage.footer;
  const allUsers = await footer.getAllUsernames();
  const password = await footer.getPassword();
  const username = allUsers.find(u => u === 'standard_user');
  if (!username) throw new Error('standard_user not found in footer');
  await loginPage.login(username, password);
  await expect(page).toHaveURL(/inventory.html/);
  const inventoryPage = new InventoryPage(page);
  const itemsCount = await inventoryPage.getInventoryItemsCount();
  expect(itemsCount).toBeGreaterThan(0);
});

test('Check login failure using invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  const footer = loginPage.footer; 
  const allUsers = await footer.getAllUsernames(); 
  // Используем первый username и неправильный пароль
  await loginPage.login(allUsers[0], 'wrong_password');
  // Ждём появления ошибки и проверяем
  const isErrorVisible = await loginPage.isErrorVisible();
  expect(isErrorVisible).toBeTruthy();
});

test('Check add all items to cart and remove one', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(validUser.username, validUser.password);
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addAllToCart();
  const cartCount = await inventoryPage.getInventoryItemsCount();
  const itemsInCart = await inventoryPage.getItemsInCartCount();
  expect(itemsInCart).toBe(cartCount);
  const cartPage = new CartPage(page);
  await cartPage.navigate();
  await cartPage.removeItemByIndex(0);
  const newCount = await cartPage.getItemsCount();
  expect(newCount).toBe(cartCount - 1);
});

test('Check inventory sorting', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(validUser.username, validUser.password);
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.header.selectSort('az');
  const firstItemAZ = await inventoryPage.getItemNameByIndex(0);
  await inventoryPage.header.selectSort('za');
  const firstItemZA = await inventoryPage.getItemNameByIndex(0);
  expect(firstItemAZ).not.toBe(firstItemZA);
});

test('Check checkout flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(validUser.username, validUser.password);
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addAllToCart();
  const cartPage = new CartPage(page);
  await cartPage.navigate();
  await cartPage.checkout();
  const checkoutPage = new CheckoutInfoPage(page);
  await checkoutPage.fillCheckoutForm('Anna', 'Kolyagina', '12345');
  await checkoutPage.continueCheckout();
  expect(await checkoutPage.hasError()).toBeFalsy();
});
});

