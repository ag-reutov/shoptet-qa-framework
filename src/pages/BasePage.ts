import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(path: string = '/') {
    await this.page.goto(path, { waitUntil: 'networkidle' });
  }

  async acceptCookies() {
    const button: Locator = this.page.locator(
      'button:has-text("Souhlasím"), button:has-text("Přijmout cookies"), [data-testid="buttonCookiesAccept"]',
    );
    if (
      await button
        .first()
        .isVisible({ timeout: 3000 })
        .catch(() => false)
    ) {
      await button.first().click();
    }
  }

  async expectTitleContains(text: string) {
    await expect(this.page).toHaveTitle(new RegExp(text, 'i'));
  }
}
