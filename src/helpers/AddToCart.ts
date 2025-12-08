import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class AddToCart {
  constructor(private page: Page) {}

  async perform() {
    await this.page.goto('/produkt/nejaky-produkt/');
    const addToCartBtn = this.page.locator('text="Do košíku"').first();
    await expect(addToCartBtn).toBeVisible({ timeout: 5000 });
    await addToCartBtn.click();

    const goToCartBtn = this.page.locator('[data-testid="headerCartPrice"]');
    await expect(goToCartBtn).toBeVisible({ timeout: 5000 });
    await goToCartBtn.click();

    await expect(this.page).toHaveURL(/.*kosik/);
  }
}
