import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Customer } from '../utils/dataFactory';

export class CheckoutStep2Page extends BasePage {
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly zipInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameInput = page.locator('input[name="billFullName"]');
    this.emailInput = page.locator('input#email[name="email"]');
    this.phoneInput = page.locator('input[name="phone"]');
    this.streetInput = page.locator('input[name="billStreet"]');
    this.cityInput = page.locator('input[name="billCity"]');
    this.zipInput = page.locator('input[name="billZip"]');
    this.submitButton = page.getByRole('button', { name: /objednat/i });
  }

  async fillContactForm(customer: Customer) {
    await this.fullNameInput.fill(`${customer.firstName} ${customer.lastName}`);
    await this.emailInput.fill(customer.email);
    await this.phoneInput.fill(customer.phone);
    await this.streetInput.fill(customer.street);
    await this.cityInput.fill(customer.city);
    await this.zipInput.fill(customer.zip);
  }

  async submitOrder() {
    await this.submitButton.click();
    await this.page.waitForURL(/.*/, { waitUntil: 'networkidle', timeout: 30000 });
  }
}
