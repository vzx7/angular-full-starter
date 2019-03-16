/**
 * Password strength data model.
 */
export interface PasswordStrength {
  /**
   * Length more than 8 characters.
   */
  length: boolean;
  /**
   * digits exist.
   */
  digits: boolean;
  /**
   * capital exist.
   */
  capital: boolean;
  /**
   * lowerCase exist.
   */
  lowerCase: boolean;
}
