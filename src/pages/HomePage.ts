import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly addToCartButtons: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    // "Do košíku" buttons are inside form > button > span
    this.addToCartButtons = page.locator('form button:has-text("Do košíku")');
    // Cart link in header
    this.cartLink = page.getByTestId('headerCart');
  }

  async addFirstProductToCart() {
    const button = this.addToCartButtons.first();
    await button.click();
    // Wait for cart to be updated
    await this.page.waitForTimeout(500);
    // Verify cart is now visible/has content
    await expect(this.cartLink).toBeVisible();
  }
}
