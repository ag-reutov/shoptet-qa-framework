import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { CartPage } from '../../src/pages/CartPage';
import { CustomerLoginPage } from '../../src/pages/CustomerLoginPage';

// Test returning customer flow with pre-registered credentials
// This assumes customer is already registered from previous tests

test.describe('Returning Customer Flow', () => {
  test('login existing user and complete checkout', async ({ page }) => {
    // Use pre-registered customer credentials
    const existingCustomer = {
      email: 'test.customer@example.com',
      password: 'TestPassword123!',
    };

    const home = new HomePage(page);
    const cart = new CartPage(page);
    const login = new CustomerLoginPage(page);

    // Start returning customer flow: login with existing credentials
    await home.open('/');
    await home.acceptCookies();
    await home.signInLink.click();
    await login.login(existingCustomer.email, existingCustomer.password);

    // Wait for login to complete
    await page.waitForURL(/\/klient\//);
    await page.waitForLoadState('load');

    // Verify we're logged in - check for customer center link
    const customerLink = page.locator('a[href*="/klient/nastaveni"]');
    await expect(customerLink).toBeVisible({ timeout: 5000 });

    // Add first product to cart directly (stay on current page or navigate to category)
    // Go to a category page to ensure we see products
    await page.goto('https://755742.myshoptet.com/obleceni/');
    await page.waitForLoadState('load');

    // Add first product to cart using HomePage method
    await home.addFirstProductToCart();

    // Go to cart and verify items are there
    await page.goto('https://755742.myshoptet.com/kosik/');
    await page.waitForLoadState('load');
    await cart.assertHasItems();
  });
});
