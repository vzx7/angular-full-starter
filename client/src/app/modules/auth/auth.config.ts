import { IAuthConfig } from './interfaces/i.config';

/**
 * Authentication module settings.
 */
export const authConfig: IAuthConfig = {
  api: {
    confirm_password: 'confirm_password_reset',
    confirm_register: 'confirm_register',
    login: 'login',
    passwordReset: 'password_reset',
    register: 'register',
  }
};
