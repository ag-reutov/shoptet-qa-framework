import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../../src/pages/AdminLoginPage';
import { AdminProductsPage } from '../../src/pages/AdminProductsPage';

test.describe('Admin Product Management', () => {
  test('admin can add, verify, and delete a product', async ({ page }) => {
    const adminLogin = new AdminLoginPage(page);
    const adminProducts = new AdminProductsPage(page);

    // Admin credentials
    const adminEmail = 'ag.reutov@proton.me';
    const adminPassword = 'jikig-ovub-udog';

    // Test product details
    const productName = 'Tshirt';
    const productPrice = '200';

    // Step 1: Login to admin
    await adminLogin.openAdminLogin();
    await adminLogin.login(adminEmail, adminPassword);

    // Verify we're on admin dashboard
    await expect(page).toHaveURL(/\/admin\//);

    // Step 2: Navigate directly to products page
    await adminProducts.openProductsPage();

    // Step 3: Add new product
    await adminProducts.addProduct(productName, productPrice);

    // Step 4: Save the product
    await adminProducts.saveProduct();

    // Step 5: Go to storefront to verify product
    const storefrontPage = await adminProducts.goToStorefront();

    // Accept cookies on storefront
    const cookieButton = storefrontPage.locator(
      'button:has-text("Souhlasím"), button:has-text("Přijmout"), [data-testid="buttonCookiesAccept"]',
    );
    try {
      await cookieButton.first().click();
    } catch {
      // Cookie button may not be present if already accepted
    }

    // Search for the product
    const searchInput = storefrontPage.getByTestId('searchInput');
    const searchBtn = storefrontPage.getByTestId('searchBtn');
    await searchInput.fill(productName);
    await searchBtn.click();

    // Wait for search results page
    await storefrontPage.waitForURL(/\/vyhledavani\/\?string=Tshirt/);

    // Assert product card name is present
    const productCard = storefrontPage
      .getByTestId('productCardName')
      .filter({ hasText: productName })
      .first();
    await expect(productCard).toBeVisible({ timeout: 5000 });

    // Close storefront tab and switch back to admin
    await storefrontPage.close();

    // Step 6: Go back to products page
    await adminProducts.openProductsPage();

    // Step 7: Filter by created today
    await adminProducts.filterByCreatedToday();

    // Step 8: Delete the product
    await adminProducts.deleteFirstProduct();

    // Wait for deletion to complete
    await page.waitForLoadState('load');

    // Verify product is deleted (optional - could check it's no longer in the list)
  });
});
