/**
 * Login Data Model
 */
export interface Credential {
  /**
   * Login.
   */
  login: string;

  /**
   * Last name.
   */
  password: string;

  /**
   * Patronymic.
   */
  rememberMe: boolean;
}
