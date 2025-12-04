import { Actor, Cast, TakeNotes } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import { CallAnApi } from '@serenity-js/rest';
import { Browser } from '@playwright/test';

export class Actors implements Cast {
    constructor(
        private readonly browser: Browser,
        private readonly options: { baseURL?: string }
    ) {
    }

    prepare(actor: Actor): Actor {
        return actor.whoCan(
            BrowseTheWebWithPlaywright.using(this.browser, this.options),
            CallAnApi.at(this.options.baseURL || 'https://www.shoptet.cz'),
            TakeNotes.usingAnEmptyNotepad()
        );
    }
}
