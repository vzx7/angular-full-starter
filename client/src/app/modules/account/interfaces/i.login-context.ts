/**
 * Login context
 */
export interface ILoginContext {
  /**
   * User name
   */
  login: string;
  /**
   * Password
   */
  password: string;
  /**
   * flag - is remember
   */
  remember?: boolean;
}
