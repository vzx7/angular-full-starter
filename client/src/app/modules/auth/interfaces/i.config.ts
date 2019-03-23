/**
 * Authentication module settings.
 */
export interface IAuthConfig {
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
