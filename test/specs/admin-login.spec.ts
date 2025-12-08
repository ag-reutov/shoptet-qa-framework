import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../../src/pages/AdminLoginPage';

test.describe('Shoptet Admin Login', () => {
    test('allows the Admin to access CMS', async ({ page }) => {
        const admin = new AdminLoginPage(page);

        await admin.openAdminLogin();
        // TODO: replace with real admin credentials from env or secrets
        await admin.login(process.env.SHOPTET_ADMIN_USER || 'admin', process.env.SHOPTET_ADMIN_PASS || 'password');

        await expect(page).toHaveURL(/.*\/admin\/.*/);
    });
});