import { Page, expect } from '@playwright/test';

export class AddToCart {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async perform() {
        // 1. Go to Homepage
        await this.page.goto('/');

        // 2. Find the first product "Add to Cart" button
        // Shoptet usually has a class like '.p-tools .btn-cart' or data-testid
        // We will use a robust text locator to be safe
        const addToCartBtn = this.page.locator('text="Do košíku"').first();
        
        // Wait for it to be visible
        await expect(addToCartBtn).toBeVisible();
        await addToCartBtn.click();

        // 3. Handle the "Added to Cart" Modal
        // Shoptet usually shows a modal asking to go to cart or continue shopping
        const goToCartBtn = this.page.locator('[data-testid="headerCartPrice"]');
        
        await expect(goToCartBtn).toBeVisible();
        await goToCartBtn.click();

        // 4. Verify we are in the cart
        await expect(this.page).toHaveURL(/.*kosik/);
    }
}