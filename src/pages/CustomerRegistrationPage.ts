import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CustomerRegistrationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openRegistration() {
    await this.goto('/registrace/');
    await this.page.waitForSelector('[data-testid="formRegistration"]', { timeout: 5000 });
  }

  async fillRegistrationForm(email: string, password: string) {
    await this.page.getByTestId('formRegistration').getByTestId('inputEmail').fill(email);
    await this.page.getByTestId('formRegistration').getByTestId('inputPassword').fill(password);
    await this.page.getByTestId('formRegistration').getByTestId('inputPasswordAgain').fill(password);
  }

  async submit() {
    await this.page.getByTestId('formRegistration').getByTestId('submitButton').click();
  }

  async isLoggedIn() {
    return this.page.getByTestId('accountLogout').isVisible();
  }
}
