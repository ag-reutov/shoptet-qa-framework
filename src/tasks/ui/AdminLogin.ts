import { Task } from '@serenity-js/core';
import { Click, Enter, Navigate } from '@serenity-js/web';
import { CmsLoginTargets } from '../../ui/targets/AdminLoginTargets';

const AdminCredentials = {
    email: process.env.ADMIN_EMAIL || '',
    pass: process.env.ADMIN_PASSWORD || '',
};

export const AdminLogin = {
    // We renamed this to 'asAnAdmin' per your request
    asAnAdmin: () =>
        Task.where('#actor logs into the CMS as an Admin',
            Navigate.to('/admin/login/'),
            
            Enter.theValue(AdminCredentials.email)
                 .into(CmsLoginTargets.UsernameField),
            
            Enter.theValue(AdminCredentials.pass)
                 .into(CmsLoginTargets.PasswordField),
            
            Click.on(CmsLoginTargets.SubmitButton)
        ),
};