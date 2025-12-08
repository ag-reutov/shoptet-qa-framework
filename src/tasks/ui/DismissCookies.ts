// DismissCookies.ts (deprecated)
// Cookie dismissal is handled in POM `BasePage.dismissCookiesIfVisible()`.

export const DismissCookies = async (page: any) => {
  const popup = page.locator('[data-testid="cookiesPopup"]');
  const accept = page.locator('[data-testid="buttonCookiesAccept"]');
  if (await popup.isVisible().catch(() => false)) {
    await accept.click();
  }
};