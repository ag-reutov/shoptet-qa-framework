import { describe, it } from '@serenity-js/playwright-test';
import { Navigate, Page } from '@serenity-js/web';
import { Ensure, equals } from '@serenity-js/assertions';

describe('Shoptet Website', () => {

    it('allows Alice to visit the home page', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('/'), 
            
            
            Ensure.that(
                Page.current().title(), 
                equals('Vítejte v našem obchodě - Můj e-shop') 
            ),
        );
    });
});
