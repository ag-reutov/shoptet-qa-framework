import { describe, it, beforeEach } from '@serenity-js/playwright-test';
import { Click, isVisible } from '@serenity-js/web';
import { CustomerRegistrationTargets } from '../../src/ui/targets/CustomerRegistrationTargets';
import { Check } from '@serenity-js/core';
import { expect } from '@playwright/test';

describe('Visual Regression', () => {

    beforeEach(async ({ context }) => {
        await context.clearCookies();
    });

    it('ensures the registration page looks correct', async ({ actor, page, baseURL }) => {
        
        await page.goto(baseURL + '/registrace/', { 
            waitUntil: 'networkidle' 
        });

        await actor.attemptsTo(
            Check.whether(CustomerRegistrationTargets.AllowCookiesButton, isVisible())
                .andIfSo(Click.on(CustomerRegistrationTargets.AllowCookiesButton)),
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