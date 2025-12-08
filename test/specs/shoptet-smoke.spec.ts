import { test, expect } from '@playwright/test';

test.describe('Shoptet Website', () => {
    test('allows visiting the home page', async ({ page }) => {
        await page.goto('/', { waitUntil: 'networkidle' });
        await expect(page).toHaveTitle('Vítejte v našem obchodě - Můj e-shop');
    });
});
