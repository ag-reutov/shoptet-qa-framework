import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminProductsPage extends BasePage {
  readonly productsMenuLink: Locator;
  readonly productsOverviewLink: Locator;
  readonly addProductButton: Locator;
  readonly productNameInput: Locator;
  readonly productCategorySelect: Locator;
  readonly productPriceInput: Locator;
  readonly addProductSubmitButton: Locator;
  readonly saveAndStayButton: Locator;
  readonly storefrontLink: Locator;
  readonly filterToggleButton: Locator;
  readonly createdAtDaysSelect: Locator;
  readonly activateFilterButton: Locator;
  readonly deleteProductButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productsMenuLink = page.locator('a[href="/admin/katalog/"].navigation__link');
    this.productsOverviewLink = page.locator('a[href="/admin/produkty/"].navigation__link');
    this.addProductButton = page.getByTestId('buttonAddProduct');
    this.productNameInput = page.getByTestId('inputProductName');
    this.productCategorySelect = page.getByTestId('selectProductCategory');
    this.productPriceInput = page.getByTestId('inputProductPrice');
    this.addProductSubmitButton = page.locator('a.btn.submit-js[title="Přidat"]');
    this.saveAndStayButton = page
      .locator('[data-testid="buttonSaveAndStay"], button:has-text("Uložit"), a:has-text("Uložit")')
      .first();
    this.storefrontLink = page.locator('a.headerNavigation__link--eshop[href="/"]');
    this.filterToggleButton = page.getByTestId('buttonToggleFilter');
    this.createdAtDaysSelect = page.locator('select[name="createdAtDays"]');
    this.activateFilterButton = page.getByTestId('buttonActivateFilter');
    this.deleteProductButton = page.getByTestId('buttonUniversalConfirm');
  }

  async openProductsPage() {
    await this.open('/admin/produkty/');
  }

  async navigateToProducts() {
    // Click products menu to open submenu
    await this.productsMenuLink.click();

    // Wait for dropdown to appear
    await this.page.waitForTimeout(500);

    // Click overview link from dropdown (should be visible after menu opens)
    await this.productsOverviewLink.click();
    await this.page.waitForURL(/\/admin\/produkty\//);
  }

  async addProduct(name: string, price: string) {
    await this.addProductButton.click();

    // Wait for modal to appear
    await expect(this.productNameInput).toBeVisible({ timeout: 5000 });

    // Fill product details
    await this.productNameInput.fill(name);

    // Select first category
    await this.productCategorySelect.selectOption({ index: 1 });

    await this.productPriceInput.fill(price);

    // Click add button
    await this.addProductSubmitButton.click();

    // Wait for redirect to product customization page
    await this.page.waitForLoadState('load');
  }

  async saveProduct() {
    await this.saveAndStayButton.click();
    await this.page.waitForLoadState('load');
  }

  async goToStorefront() {
    // Click storefront link (opens in new tab)
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.storefrontLink.click(),
    ]);
    await newPage.waitForLoadState('load');
    return newPage;
  }

  async filterByCreatedToday() {
    await this.filterToggleButton.click();
    await expect(this.createdAtDaysSelect).toBeVisible({ timeout: 3000 });

    // Select first option (index 0) which should be '0 vytvořeno dnes'
    await this.createdAtDaysSelect.selectOption({ index: 0 });

    await this.activateFilterButton.click();
    await this.page.waitForLoadState('load');
  }

  async deleteFirstProduct() {
    // The delete button might be hidden, need to find and scroll to it
    const deleteBtn = this.deleteProductButton.first();

    // Scroll the button into view
    await deleteBtn.scrollIntoViewIfNeeded();

    // Wait a moment for any hover effects
    await this.page.waitForTimeout(500);

    // Set up dialog handler before clicking
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });

    // Click the delete button with force if needed
    await deleteBtn.click({ force: true });

    // Wait for deletion to complete
    await this.page.waitForLoadState('load');
  }
}
