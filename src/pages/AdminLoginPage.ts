import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminLoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page
      .locator('input[name="login"], input[name="email"], input[type="email"]')
      .first();
    this.passwordInput = page.locator('input[name="password"], input[type="password"]').first();
    this.loginButton = page
      .locator('button[type="submit"], input[type="submit"], button:has-text("Přihlásit")')
      .first();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL(/\/admin\//);
  }

  async openAdminLogin() {
    await this.open('/admin/login/');
  }
}
