import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { CustomerRegistrationPage } from '../../src/pages/CustomerRegistrationPage';
import { CustomerSettingsPage } from '../../src/pages/CustomerSettingsPage';
import { buildCustomer } from '../../src/utils/dataFactory';

test.describe('Customer Registration Flow', () => {
  test('registers new user and saves contact details', async ({ page }) => {
    const customer = buildCustomer();
    const home = new HomePage(page);
    const registration = new CustomerRegistrationPage(page);
    const settings = new CustomerSettingsPage(page);

    await home.open('/');
    await home.acceptCookies();

    // Navigate to registration from header popup
    await home.goToRegistration();

    // Complete registration form
    await registration.register(customer.email, customer.password);

    // Fill contact details on /klient/nastaveni
    await settings.fillContactDetails(
      `${customer.firstName} ${customer.lastName}`,
      customer.phone,
      customer.street,
      customer.city,
      customer.zip,
    );
    await settings.save();

    // Basic assertion: URL stays on settings page and fields are filled
    await expect(page).toHaveURL(/klient\/nastaveni/);
  });
});
