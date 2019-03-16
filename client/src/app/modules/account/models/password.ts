/**
 * Password data model
 */
export interface Password {
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
