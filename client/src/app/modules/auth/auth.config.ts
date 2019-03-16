/**
 * Authentication module settings.
 */
interface AuthConfig {
  /**
   * Api
   */
  api: {
    /**
     * Password confirmation.
     */
    confirm_password: string,
    /**
     * Registration confirmation.
     */
    confirm_register: string,
    /**
     * Auth.
     */
    login: string;
    /**
     * Registration
     */
    register: string;
    /**
     * Send mail to reset your password
     */
    passwordReset: string;
  };
}

export const authConfig: AuthConfig = {
  api: {
    confirm_password: 'confirm_password_reset',
    confirm_register: 'confirm_register',
    login: 'login',
    passwordReset: 'password_reset',
    register: 'register',
  }
};
