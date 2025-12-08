import { test, expect } from '@playwright/test';
import { AddToCart } from '../../src/helpers/AddToCart';
import { faker } from '@faker-js/faker';


test.describe('Critical User Path: Checkout', () => {

    test('should add product to cart and proceed to checkout', async ({ page }) => {
        
        // --- Step 0: Dismiss Cookie Popup ---
        const cookiesPopup = page.locator('[data-testid="cookiesPopup"]');
        const acceptButton = page.locator('[data-testid="buttonCookiesAccept"]');
        
        if (await cookiesPopup.isVisible({ timeout: 2000 }).catch(() => false)) {
            await acceptButton.click();
        }

        // --- Step 1: Add Item to Cart ---
        const addToCart = new AddToCart(page);
        await addToCart.perform();

        // --- Step 2: Validate Cart Content ---
        const cartItem = page.locator('.cart-table tr');
        await expect(cartItem).toBeVisible();

        // --- Proceed to Delivery options ---
        const continueBtn = page.locator('[data-testid="buttonNextStep"]'); // "Pokračovat"
        await continueBtn.click();
        
        //     Step 3: Delivery Options page
        //    Verify we moved to the Delivery Options selection step
        await expect(page).toHaveURL(/.*objednavka.*krok-1/);

        // --- Select Shipping  ---
        const firstShipping = page.locator('[data-testid="shippingMethod"]').first();
        await firstShipping.click({ force: true });

        // Wait until the modal is fully open
        await expect(page.locator('.modal-selector-for-pickup')).toBeVisible({ timeout: 5000 }); // Replace .modal-selector-for-pickup with actual class or attribute
        const zipInput = page.locator('[name="zipCode"]');
        await expect(zipInput).toBeVisible();

        // --- Click Search
        const searchBtn = page.locator('[data-testid="searchDeliveryPoint"]');
        await searchBtn.click();

        // --- Select the first available pickup point ---
        const selectBtn = page.locator('[data-testid="selectDeliveryPoint"]').first();
        await expect(selectBtn).toBeVisible();
        await selectBtn.click();
        
        // --- Click continue to next step
        await continueBtn.click();
        
        // --- Step 4: Contacts info page ---

        // Verify we moved to the Contacts Info step
        await expect(page).toHaveURL(/.*objednavka.*krok-2/);

        // 1. Fill Full Name (Generates e.g. "John Doe")
        await page.locator('[name="billFullName"]').fill(faker.person.fullName());

        // 2. Fill Email (Generates e.g. "john.doe@example.com")
        await page.locator('[data-testid="inputEmail"]').nth(1).fill(faker.internet.email());
        
        // 3. Fill Phone (Generates a random 9-digit number)
        // We generate phone number starting with 705 and random up to 9 digits
        await page.locator('[name="phone"]').fill('705' + faker.string.numeric(6));
        // 4. Fill Address
        await page.locator('[name="billStreet"]').fill(faker.location.streetAddress());
        await page.locator('[name="billCity"]').fill(faker.location.city());
        
        // 5. Fill Zip 
        // We stick to a specific ZIP (like 10000) or generate a valid format
        // Shoptet validates ZIP existence often, so 10000 is safer than random
        await page.locator('[name="billZip"]').fill('10000');

        // 6. Submit Order
        await continueBtn.click();

        // --- Step 5: Order Success ---
        // 1. Verify URL contains /dekujeme/ (Thank you)
        await expect(page).toHaveURL(/.*objednavka\/dekujeme/);

        // 2. Verify the Success Message exists
        const successMessage = page.locator('[data-testid="textRecapMessage"]');
        await expect(successMessage).toBeVisible();

        
        console.log('Critical Path: Product added and navigated to Contact Form successfully.');
    });

});