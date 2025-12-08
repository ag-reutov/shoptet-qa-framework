import { By, PageElement } from '@serenity-js/web';

export const CustomerRegistrationTargets = {
    // Navigation Targets (Used by CustomerRegistration task)
    LoginLink: PageElement.located(By.css('.top-nav-button[data-testid="signin"]:visible'))
        .describedAs('Storefront login link'),
    RegistrationLink: PageElement.located(By.css('[data-testid="signup"]'))
        .describedAs('New registration link'),

    // Registration Form Inputs (Used by CustomerRegistration task)
    EmailField: PageElement.located(By.id('email'))
        .describedAs('Registration email field'),
    PasswordField: PageElement.located(By.id('password'))
        .describedAs('Registration password field'),
    PasswordAgainField: PageElement.located(By.id('passwordAgain'))
        .describedAs('Password confirmation field'),
    SubmitButton: PageElement.located(By.css('input[type="submit"][value="Registrovat"]'))
        .describedAs('Registration submit button'),
    
    // Stability & Popup Targets
    AllowCookiesButton: PageElement.located(By.css('[data-testid="buttonCookiesAccept"]'))
        .describedAs('Allow all cookies button'),
    
    // Success Assertion Target
    LogoutLink: PageElement.located(By.css('[data-testid="buttonSignout"]'))
        .describedAs('Logout link (Success Indicator)'),
};