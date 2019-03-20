/**
 * Password data model
 */
export interface IPassword {
  /**
   * Current password.
   */
  password: string;

  /**
   * New password.
   */
  newPassword: string;

  /**
   * Reapit new password.
   */
  repeatNewPassword: string;
}
