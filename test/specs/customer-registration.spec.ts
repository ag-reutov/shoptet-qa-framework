import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerRegistrationPage } from '../../src/pages/CustomerRegistrationPage';

test.describe('Customer Registration Flow', () => {

  test('allows a new customer to register and redirects to user profile', async ({ page }) => {
    const registration = new CustomerRegistrationPage(page);

    const email = faker.internet.email();
    const password = faker.internet.password({ length: 12, prefix: 'Test1!' });

    await registration.openRegistration();
    await registration.dismissCookiesIfVisible();
    await registration.fillRegistrationForm(email, password);
    await registration.submit();

    await expect(page).toHaveURL(/.*klient\/nastaveni\/?.*/);
    await expect(page.getByTestId('accountLogout')).toBeVisible();
  });

});