import { describe, it } from '@serenity-js/playwright-test';
import { CustomerRegistration } from '../../src/tasks/ui/CustomerRegistration';
import { CustomerRegistrationTargets } from '../../src/ui/targets/CustomerRegistrationTargets';
import { DismissCookies } from '../../src/tasks/ui/DismissCookies';
import { Ensure, includes } from '@serenity-js/assertions';
import { Page, isVisible } from '@serenity-js/web';

describe('Customer Registration Flow', () => {

    it('allows a new customer to register and redirects to user profile', async ({ actor }) => {
        
        await actor.attemptsTo(
            // 0. Dismiss cookie popup if it appears
            DismissCookies(),

            // 1. Perform the complex, slow registration task
            // This also generates and saves the unique email/password in memory.
            CustomerRegistration.viaUI(),

            // 2. Assertion: Check if the success page URL loads
            // (We assert that the user is now in the account area)
            Ensure.that(
                Page.current().url().pathname,
                includes('klient/nastaveni/') 
            ),
            Ensure.that(
                CustomerRegistrationTargets.LogoutLink,
                isVisible()
            )
        );
    });
});