import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchResultsPage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productCards: Locator;
  readonly filterSidebar: Locator;
  readonly sortSelect: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator(
      'input[type="search"], input[name="q"], input[placeholder*="hledáte" i]',
    );
    this.searchButton = page.locator(
      'button[type="submit"], button:has-text("Hledat"), input[type="submit" i]',
    );
    this.productCards = page.locator('[data-testid="product"], .product');
    this.filterSidebar = page.locator('.filters, .sidebar');
    this.sortSelect = page.locator('select[name*="sort"], select[id*="sort"]');
  }

  async search(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
    await this.page.waitForLoadState('load');
    await expect(this.productCards.first()).toBeVisible({ timeout: 5000 });
  }

  async applyFirstFilter() {
    if (await this.filterSidebar.isVisible().catch(() => false)) {
      const firstCheckbox = this.filterSidebar.locator('input[type="checkbox"]').first();
      if (await firstCheckbox.isVisible().catch(() => false)) {
        await firstCheckbox.check({ force: true });
        await this.page.waitForLoadState('load');
      }
    }
  }

  async sortByFirstOption() {
    if (await this.sortSelect.isVisible().catch(() => false)) {
      const options = await this.sortSelect.locator('option').all();
      if (options.length > 1) {
        await this.sortSelect.selectOption({ index: 1 });
        await this.page.waitForLoadState('load');
      }
    }
  }
}
