/**
 * Password recovery data model.
 */
export interface PasswordRecovery {
  /**
   * Password hashed.
   */
  password: string;

  /**
   * Recovery key for user identification.
   */
  code: string;

  /**
   * User ID.
   */
  userid: string;
}
