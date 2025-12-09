import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CustomerLoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    const loginForm = page.getByTestId('formLogin');
    this.emailInput = loginForm.getByTestId('inputEmail');
    this.passwordInput = loginForm.locator('input[name="password"]');
    this.submitButton = loginForm.getByTestId('buttonSubmit');
  }

  async login(email: string, password: string) {
    await expect(this.emailInput).toBeVisible({ timeout: 5000 });
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
