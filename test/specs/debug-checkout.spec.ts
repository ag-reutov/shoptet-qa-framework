import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { CartPage } from '../../src/pages/CartPage';

test('debug checkout step 1 shipping methods', async ({ page }) => {
  const home = new HomePage(page);
  const cart = new CartPage(page);

  await home.open('/');
  await home.acceptCookies();
  await home.addFirstProductToCart();
  await cart.goToCart();
  await cart.proceedToCheckout();

  console.log('Current URL:', page.url());

  // Find all shipping methods
  const shippingMethods = page.getByTestId('shippingMethod');
  const count = await shippingMethods.count();
  console.log(`Found ${count} shipping methods`);

  for (let i = 0; i < count; i++) {
    const method = shippingMethods.nth(i);
    const text = await method.textContent();
    const id = await method.getAttribute('id');
    const hasModal = await method.locator('[data-target], button').count();
    console.log(`[${i}] ${id}: ${text?.substring(0, 50)} - has button/modal: ${hasModal > 0}`);
  }

  // Look for delivery point button
  const deliveryBtn = page.locator('button:has-text("Vybrat"), [data-target]').first();
  console.log('Delivery point button visible:', await deliveryBtn.isVisible().catch(() => false));

  await page.screenshot({ path: 'debug-step1.png', fullPage: true });
});
