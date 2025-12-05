import { describe, it } from '@serenity-js/playwright-test';
import { GetRequest, Send } from '@serenity-js/rest';
import { Ensure, equals } from '@serenity-js/assertions';
import { Response } from '../../src/questions/api/Response';

describe('Shoptet API Health', () => {

    it('confirms the storefront is available (200 OK)', async ({ actor }) => {
        
        await actor.attemptsTo(
            // 1. Send a GET request to the homepage
            Send.a(GetRequest.to('/')),

            // 2. Ensure the server replies with 200
            Ensure.that(Response.status(), equals(200))
        );
    });
});