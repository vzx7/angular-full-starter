/**
 * User data model.
 */
export interface IUser {
  /**
   * Id
   */
  id?: string;
  /**
   * Name
   */
  firstName: string;

  /**
   * Last Name
   */
  lastName: string;

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
