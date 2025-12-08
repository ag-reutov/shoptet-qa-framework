import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.getByRole('button', { name: /pokračovat/i });
    this.cartItems = page.locator('.cart-content, .cart-table, [class*="cart__item"]');
  }

  async goToCart() {
    await this.open('/kosik/');
  }

  async assertHasItems() {
    await expect(this.cartItems.first()).toBeVisible();
  }
}
