import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CustomerSettingsPage extends BasePage {
  readonly fullNameInput: Locator;
  readonly phoneInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly zipInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameInput = page.locator('input[name="billFullName"]');
    this.phoneInput = page.locator('input[name="phone"]');
    this.streetInput = page.locator('input[name="billStreet"]');
    this.cityInput = page.locator('input[name="billCity"]');
    this.zipInput = page.locator('input[name="billZip"]');
    this.saveButton = page.locator('input[type="submit"][value*="Uložit" i]');
  }

  async fillContactDetails(
    fullName: string,
    phone: string,
    street: string,
    city: string,
    zip: string,
  ) {
    await expect(this.fullNameInput).toBeVisible({ timeout: 5000 });
    await this.fullNameInput.fill(fullName);
    await this.phoneInput.fill(phone);
    await this.streetInput.fill(street);
    await this.cityInput.fill(city);
    await this.zipInput.fill(zip);
  }

  async save() {
    await this.saveButton.click();
    await this.page.waitForURL(/klient\/nastaveni/, { timeout: 10000 });
  }
}
