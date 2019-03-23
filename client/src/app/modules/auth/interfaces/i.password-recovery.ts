/**
 * Password recovery data model.
 */
export interface IPasswordRecovery {
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
