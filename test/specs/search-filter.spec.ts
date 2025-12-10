import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { CartPage } from '../../src/pages/CartPage';

test.describe('Product Search & Filter', () => {
  test('search for mikina, open product, add to cart', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await home.open('/');
    await home.acceptCookies();

    // Search for "mikina" from homepage
    const searchInput = page.getByTestId('searchInput');
    const searchBtn = page.getByTestId('searchBtn');

    await searchInput.fill('mikina');
    await searchBtn.click();

    // Wait for search results page
    await page.waitForURL(/\/vyhledavani\/\?string=mikina/);

    // Click first product card name
    const productCardName = page.getByTestId('productCardName').first();
    await expect(productCardName).toBeVisible({ timeout: 5000 });
    await productCardName.click();

    // Wait for product page (e.g., unisex-seda-mikina/)
    await page.waitForLoadState('load');

    // Add to cart
    const addToCartBtn = page.getByTestId('buttonAddToCart');
    await expect(addToCartBtn).toBeVisible({ timeout: 5000 });
    await addToCartBtn.click();

    // Navigate directly to cart
    await page.goto('/kosik/');
    await page.waitForLoadState('networkidle');
    await cart.assertHasItems();
  });

  test('filter products in category by price and name', async ({ page }) => {
    const home = new HomePage(page);

    await home.open('/');
    await home.acceptCookies();

    // Navigate to /obleceni/ category
    const categoryLink = page.locator('a[href="/obleceni/"][data-testid="headerMenuItem"]').first();
    await categoryLink.click();
    await page.waitForURL(/\/obleceni\//);

    // Click "Nejdražší" (Price high to low)
    const sortHighToLow = page.locator('button#listSortingControl--price');
    await expect(sortHighToLow).toBeVisible({ timeout: 5000 });
    await sortHighToLow.click();
    await expect(page).toHaveURL(/\/obleceni\/\?order=-price/);

    // Click "Abecedně" (Name A to Z)
    const sortAlpha = page.locator('button#listSortingControl-name');
    await expect(sortAlpha).toBeVisible({ timeout: 5000 });
    await sortAlpha.click();
    await expect(page).toHaveURL(/\/obleceni\/\?order=name/);

    // Click "Nejlevnější" (Price low to high)
    const sortLowToHigh = page.locator('button#listSortingControl-price');
    await expect(sortLowToHigh).toBeVisible({ timeout: 5000 });
    await sortLowToHigh.click();
    await expect(page).toHaveURL(/\/obleceni\/\?order=price/);

    // Verify products are still visible after sorting
    const productCards = page.getByTestId('productCardName');
    await expect(productCards.first()).toBeVisible({ timeout: 5000 });
  });
});
