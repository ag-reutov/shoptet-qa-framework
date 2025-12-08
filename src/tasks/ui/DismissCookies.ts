// src/tasks/ui/DismissCookies.ts

import { Check, Task } from '@serenity-js/core';
import { By, Click, isVisible, PageElement } from '@serenity-js/web';

// Define the locators using PageElement
const CookiesPopup = PageElement.located(By.css('[data-testid="cookiesPopup"]'))
    .describedAs('cookies popup');
const AcceptCookiesButton = PageElement.located(By.css('[data-testid="buttonCookiesAccept"]'))
    .describedAs('accept cookies button');

export const DismissCookies = () =>
    Task.where(`#actor dismisses the cookie popup`,
        Check.whether(CookiesPopup, isVisible())
            .andIfSo(
                Click.on(AcceptCookiesButton)
            )
    );