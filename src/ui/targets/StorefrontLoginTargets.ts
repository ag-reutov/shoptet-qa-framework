import { By, PageElement } from '@serenity-js/web';

export const StorefrontLoginTargets = {
    // The specific desktop login button (avoids the mobile menu duplicate)
    LoginLink: PageElement.located(By.css('.top-nav-button[data-testid="signin"]'))
        .describedAs('Storefront login link'),

    // The container of the popup (Best for Visual Snapshot)
    LoginModal: PageElement.located(By.id('customerLogin'))
        .describedAs('Login popup modal'),

    // Form elements (Good for future functional tests)
    EmailField: PageElement.located(By.css('[data-testid="inputEmail"]')),
    PasswordField: PageElement.located(By.css('[data-testid="inputPassword"]')),
    SubmitButton: PageElement.located(By.css('[data-testid="buttonSubmit"]'))
};