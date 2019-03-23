/**
 * Login Data Model
 */
export interface ICredential {
  /**
   * Login.
   */
  login: string;

  /**
   * Last name.
   */
  password: string;

  /**
   * Remember me.
   */
  rememberMe: boolean;
}
