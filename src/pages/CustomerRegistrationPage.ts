import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CustomerRegistrationPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordAgainInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    // Use registration form specifically to avoid login form duplication
    const regForm = page.getByTestId('formRegistration');
    this.emailInput = regForm.getByTestId('inputEmail');
    this.passwordInput = regForm.locator('input[name="password"]');
    this.passwordAgainInput = regForm.locator('input[name="passwordAgain"]');
    this.submitButton = page.locator('input[type="submit"][value*="Registrovat" i]');
  }

  async register(email: string, password: string) {
    await expect(this.emailInput).toBeVisible({ timeout: 5000 });
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.passwordAgainInput.fill(password);
    await this.submitButton.click();
    await this.page.waitForURL(/\/klient\/nastaveni/);
  }
}
