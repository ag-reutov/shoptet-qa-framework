import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { CartPage } from '../../src/pages/CartPage';

test.describe('Shoptet Smoke', () => {
  test('home loads and title is correct', async ({ page }) => {
    const home = new HomePage(page);
    await home.open('/');
    await home.acceptCookies();
    await home.expectTitleContains('Vítejte');
  });

  test('add first product to cart', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await home.open('/');
    await home.acceptCookies();
    await home.addFirstProductToCart();

    await cart.goToCart();
    await cart.assertHasItems();
  });
});
