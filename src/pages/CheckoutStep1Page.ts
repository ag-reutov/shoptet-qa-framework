import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutStep1Page extends BasePage {
  readonly shippingMethods: Locator;
  readonly continueButton: Locator;
  readonly personalPickupOption: Locator;

  constructor(page: Page) {
    super(page);
    this.shippingMethods = page.getByTestId('shippingMethod');
    this.continueButton = page.getByTestId('buttonNextStep');
    this.personalPickupOption = page
      .locator('input[type="radio"][value*="OSOBNÍ"]')
      .or(page.locator('label:has-text("OSOBNÍ ODBĚR")'))
      .first();
  }

  async selectPersonalPickup() {
    // Find and click the personal pickup option
    const osobiOdberLabel = this.page.locator('label:has-text("OSOBNÍ ODBĚR")').first();
    await expect(osobiOdberLabel).toBeVisible({ timeout: 5000 });
    await osobiOdberLabel.click();
  }

  async continue() {
    // Ensure modal overlay is gone before clicking continue
    await this.page.waitForTimeout(500);
    await this.continueButton.click();
    await this.page.waitForURL(/objednavka\/krok-2/, { timeout: 10000 });
  }
}
