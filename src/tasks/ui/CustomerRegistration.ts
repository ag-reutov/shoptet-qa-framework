import { 
    Interaction, Task, notes, Wait, Check,
    UsesAbilities, AnswersQuestions, CollectsArtifacts 
} from '@serenity-js/core';
import { Click, Enter, Navigate, isVisible } from '@serenity-js/web';
import { CustomerRegistrationTargets } from '../../ui/targets/CustomerRegistrationTargets';
import { faker } from '@faker-js/faker';

// Define the Questions that retrieve the stored credentials
const CustomerCredentials = {
    email: notes().get('email'),
    password: notes().get('password'),
};

// Generates unique credentials and stores them in Notes
const GenerateCredentials = Interaction.where(
    `#actor generates unique registration credentials`,
    async (actor: UsesAbilities & AnswersQuestions & CollectsArtifacts) => {
        
        const email = faker.internet.email();
        const password = faker.internet.password({ length: 15, prefix: 'Test1!' });

        await (actor as any).attemptsTo(
            notes().set('email', email),
            notes().set('password', password)
        );

        console.log(`[Data Prep] Generated Email: ${email}`);
    }
);

export const CustomerRegistration = {
    viaUI: () =>
        Task.where(`#actor registers a new customer via UI`,
            
            // 1. Prepare credentials
            GenerateCredentials,

            // 2. Navigate to Home
            Navigate.to('/'),

            // If cookies pop-up is visible, press Accept.
            Check.whether(CustomerRegistrationTargets.AllowCookiesButton, isVisible())
                .andIfSo(Click.on(CustomerRegistrationTargets.AllowCookiesButton)),

            // 3. Navigate to Registration
            Click.on(CustomerRegistrationTargets.LoginLink),
            
            Wait.until(CustomerRegistrationTargets.RegistrationLink, isVisible()), 
            Click.on(CustomerRegistrationTargets.RegistrationLink),

            // 4. Fill Form
            Enter.theValue(CustomerCredentials.email).into(CustomerRegistrationTargets.EmailField),
            Enter.theValue(CustomerCredentials.password).into(CustomerRegistrationTargets.PasswordField),
            Enter.theValue(CustomerCredentials.password).into(CustomerRegistrationTargets.PasswordAgainField),
            
            // 5. Submit
            Click.on(CustomerRegistrationTargets.SubmitButton),
        ),
};