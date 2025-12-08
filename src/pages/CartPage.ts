import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.getByTestId('buttonNextStep');
    this.cartItems = page.locator(
      '.cart-content, .cart-table, [class*="cart__item"], [class*="cart-item"]',
    );
  }

  async goToCart() {
    await this.open('/kosik/');
  }

  async assertHasItems() {
    await expect(this.cartItems.first()).toBeVisible();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    await this.page.waitForURL(/objednavka\/krok-1/, { timeout: 10000 });
  }
}
