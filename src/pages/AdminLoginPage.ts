import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminLoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openAdminLogin() {
    await this.goto('/admin/');
    await this.page.waitForSelector('form[action*="login"]', { timeout: 5000 });
  }

  async login(username: string, password: string) {
    await this.page.fill('input[name="login"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }
}
