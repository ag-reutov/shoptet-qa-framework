import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly addToCartButtons: Locator;
  readonly cartLink: Locator;
  readonly signInLink: Locator;
  readonly popupSignupLink: Locator;

  constructor(page: Page) {
    super(page);
    // "Do košíku" buttons are inside form > button > span
    this.addToCartButtons = page.locator('form button:has-text("Do košíku")');
    // Cart link in header
    this.cartLink = page.getByTestId('headerCart');
    this.signInLink = page.getByTestId('signin').first();
    this.popupSignupLink = page.locator('.popup-widget-inner [data-testid="signup"]');
  }

  async addFirstProductToCart() {
    const button = this.addToCartButtons.first();
    await button.click();
    // Wait for cart to be updated
    await this.page.waitForTimeout(500);
    // Verify cart is now visible/has content
    await expect(this.cartLink).toBeVisible();
  }

  async goToRegistration() {
    await this.signInLink.click();
    await expect(this.popupSignupLink).toBeVisible();
    await this.popupSignupLink.click();
    await this.page.waitForURL(/\/registrace/);
  }
}
