import { describe, it } from '@serenity-js/playwright-test';
import { AdminLogin } from '../../src/tasks/ui/AdminLogin';
import { Ensure, includes } from '@serenity-js/assertions'; 
import { Page } from '@serenity-js/web';

describe('Shoptet Admin Login', () => {

    
    it('allows the Admin to access CMS', async ({ actor: admin }) => {
        
        await admin.attemptsTo(
            AdminLogin.asAnAdmin(),
            Ensure.that(
                Page.current().url().pathname,
                includes('/admin/'),
        ));
    });
});