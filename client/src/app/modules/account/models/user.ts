/**
 * User data model.
 */
export interface User {
  /**
   * Id
   */
  id: string;
  /**
   * Last Name
   */
  lastName: string;

  /**
   * Name
   */
  firstName: string;

  /**
   * Patronymic
   */
  patronymic: string;

  /**
   * Login
   */
  login: string;

  /**
   * E-mail
   */
  email: string;

  /**
   * Password
   */
  password: string;
}
