import { By, PageElement } from '@serenity-js/web';

export const CmsLoginTargets = {
    UsernameField: PageElement.located(By.css('input[name="email"]'))
        .describedAs('CMS username field'),

    PasswordField: PageElement.located(By.css('input[name="password"]'))
        .describedAs('CMS password field'),

    SubmitButton: PageElement.located(By.css('input[type="submit"][value="Přihlášení"]'))
        .describedAs('Login submit button'),
};