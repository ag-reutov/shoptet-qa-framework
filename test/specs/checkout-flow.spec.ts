import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutStep1Page } from '../../src/pages/CheckoutStep1Page';
import { CheckoutStep2Page } from '../../src/pages/CheckoutStep2Page';
import { OrderConfirmationPage } from '../../src/pages/OrderConfirmationPage';
import { buildCustomer } from '../../src/utils/dataFactory';

test.describe('Guest Checkout Flow', () => {
  test('complete guest checkout from product to order confirmation', async ({ page }) => {
    const customer = buildCustomer();
    const home = new HomePage(page);
    const cart = new CartPage(page);
    const step1 = new CheckoutStep1Page(page);
    const step2 = new CheckoutStep2Page(page);
    const confirmation = new OrderConfirmationPage(page);

    // Add product to cart
    await home.open('/');
    await home.acceptCookies();
    await home.addFirstProductToCart();

    // Go to cart and proceed to checkout
    await cart.goToCart();
    await cart.assertHasItems();
    await cart.proceedToCheckout();

    // Step 1: Select personal pickup delivery method
    await step1.selectPersonalPickup();
    await step1.continue();

    // Step 2: Fill contact information
    await step2.fillContactForm(customer);
    await step2.submitOrder();

    // Verify order confirmation
    await confirmation.assertOrderSuccess();
  });
});
