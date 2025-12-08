// AdminLogin.ts (deprecated)
// Replaced by `src/pages/AdminLoginPage.ts` which uses Playwright POM.

export const AdminLogin = {} as any;
            Navigate.to('/admin/login/'),
            
            Enter.theValue(AdminCredentials.email)
                 .into(CmsLoginTargets.UsernameField),
            
            Enter.theValue(AdminCredentials.pass)
                 .into(CmsLoginTargets.PasswordField),
            
            Click.on(CmsLoginTargets.SubmitButton)
        ),
};