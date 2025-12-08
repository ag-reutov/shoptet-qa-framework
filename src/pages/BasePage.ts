import type { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string) {
    await this.page.goto(path, { waitUntil: 'networkidle' });
  }

  async dismissCookiesIfVisible() {
    const popup = this.page.locator('[data-testid="cookiesPopup"]');
    const accept = this.page.locator('[data-testid="buttonCookiesAccept"]');
    if (await popup.isVisible().catch(() => false)) {
      await accept.click();
    }
  }
}
