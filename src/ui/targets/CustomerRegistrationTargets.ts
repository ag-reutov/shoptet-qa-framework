// CustomerRegistrationTargets.ts (deprecated)
// Use the Playwright POM in `src/pages/CustomerRegistrationPage.ts` instead.

export const CustomerRegistrationSelectors = {
  LoginLink: '.top-nav-button[data-testid="signin"]',
  RegistrationLink: '[data-testid="signup"]',
  EmailField: '#email',
  PasswordField: '#password',
  PasswordAgainField: '#passwordAgain',
  SubmitButton: 'input[type="submit"][value="Registrovat"]',
  AllowCookiesButton: '[data-testid="buttonCookiesAccept"]',
  LogoutLink: '[data-testid="buttonSignout"]',
};