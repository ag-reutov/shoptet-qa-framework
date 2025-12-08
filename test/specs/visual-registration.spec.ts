import { describe, it, beforeEach, test } from '@serenity-js/playwright-test';
import { DismissCookies } from '../../src/tasks/ui/DismissCookies';
import { expect } from '@playwright/test';

test.skip(!!process.env.CI, 'Skipping visual regression in CI due to Linux font rendering differences');

describe('Visual Regression', () => {

    beforeEach(async ({ context }) => {
        await context.clearCookies();
    });

    it('ensures the registration page looks correct', async ({ actor, page, baseURL }) => {
        
        await page.goto(baseURL + '/registrace/', { 
            waitUntil: 'networkidle' 
        });

        // Dismiss cookies using the dedicated task
        await actor.attemptsTo(
            DismissCookies()
        );

        // Use specific locator for registration form's email field
        await expect(
            page.getByTestId('formRegistration').getByTestId('inputEmail')
        ).toBeVisible({ timeout: 5000 });

        // Take screenshot
        await expect(page.locator('#content')).toHaveScreenshot('registration-page.png', {
            animations: 'disabled',
        });
    });
});