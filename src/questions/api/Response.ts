import { Question } from '@serenity-js/core';
import { LastResponse } from '@serenity-js/rest';

export const Response = {
    status: () =>
        Question.about('the response status', actor =>
            LastResponse.status().answeredBy(actor)
        )
};