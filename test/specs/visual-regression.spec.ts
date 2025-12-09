import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutStep1Page } from '../../src/pages/CheckoutStep1Page';
import { CheckoutStep2Page } from '../../src/pages/CheckoutStep2Page';
import { OrderConfirmationPage } from '../../src/pages/OrderConfirmationPage';
import { buildCustomer } from '../../src/utils/dataFactory';

test.describe('Visual Regression Tests', () => {
  // Visual tests run locally. In CI, they are skipped via playwright.config.ts (visual-regression project).
  // This is because OS font rendering differs between environments.
  // To update baselines locally: npx playwright test test/specs/visual-regression.spec.ts --update-snapshots

  test('homepage snapshot', async ({ page }) => {
    const home = new HomePage(page);
    await home.open('/');
    await home.acceptCookies();

    // Wait for page to stabilize
    await page.waitForLoadState('load');

    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('cart page snapshot', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await home.open('/');
    await home.acceptCookies();
    await home.addFirstProductToCart();
    await cart.goToCart();

    // Wait for page to stabilize
    await page.waitForLoadState('load');

    await expect(page).toHaveScreenshot('cart-page.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('checkout step 1 snapshot', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await home.open('/');
    await home.acceptCookies();
    await home.addFirstProductToCart();
    await cart.goToCart();
    await cart.proceedToCheckout();

    // Wait for page to stabilize
    await page.waitForLoadState('load');

    await expect(page).toHaveScreenshot('checkout-step1.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('checkout step 2 snapshot', async ({ page }) => {
    const customer = buildCustomer();
    const home = new HomePage(page);
    const cart = new CartPage(page);
    const step1 = new CheckoutStep1Page(page);
    const step2 = new CheckoutStep2Page(page);

    await home.open('/');
    await home.acceptCookies();
    await home.addFirstProductToCart();
    await cart.goToCart();
    await cart.proceedToCheckout();
    await step1.selectPersonalPickup();
    await step1.continue();

    // Wait for page to stabilize
    await page.waitForLoadState('load');

    // Snapshot before filling form
    await expect(page).toHaveScreenshot('checkout-step2-empty.png', {
      fullPage: true,
      animations: 'disabled',
    });

    // Fill form and take another snapshot
    await step2.fillContactForm(customer);

    // Wait for form to render using locator
    const firstInput = page.locator('input[type="text"]').first();
    await firstInput.evaluate(() => {
      /* wait for form */
    });

    await expect(page).toHaveScreenshot('checkout-step2-filled.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('order confirmation snapshot', async ({ page }) => {
    const customer = buildCustomer();
    const home = new HomePage(page);
    const cart = new CartPage(page);
    const step1 = new CheckoutStep1Page(page);
    const step2 = new CheckoutStep2Page(page);
    const confirmation = new OrderConfirmationPage(page);

    await home.open('/');
    await home.acceptCookies();
    await home.addFirstProductToCart();
    await cart.goToCart();
    await cart.proceedToCheckout();
    await step1.selectPersonalPickup();
    await step1.continue();
    await step2.fillContactForm(customer);
    await step2.submitOrder();
    await confirmation.assertOrderSuccess();

    // Wait for page to stabilize
    await page.waitForLoadState('load');

    await expect(page).toHaveScreenshot('order-confirmation.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});
