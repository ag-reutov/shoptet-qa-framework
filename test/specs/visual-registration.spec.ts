import { test, expect } from '@playwright/test';
import { CustomerRegistrationPage } from '../../src/pages/CustomerRegistrationPage';

test.skip(!!process.env.CI, 'Skipping visual regression in CI due to Linux font rendering differences');

test.describe('Visual Regression', () => {

    test.beforeEach(async ({ context }) => {
        await context.clearCookies();
    });

    test('ensures the registration page looks correct', async ({ page }) => {
        const registration = new CustomerRegistrationPage(page);
        await registration.openRegistration();
        await registration.dismissCookiesIfVisible();

        await expect(page.getByTestId('formRegistration').getByTestId('inputEmail')).toBeVisible({ timeout: 5000 });

        await expect(page.locator('#content')).toHaveScreenshot('registration-page.png', {
            animations: 'disabled',
        });
    });
});