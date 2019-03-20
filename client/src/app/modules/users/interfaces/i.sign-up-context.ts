import { IUser } from './i.user';
/**
 * SignUp Context
 */
export interface ISignUpContext extends IUser {
  /**
   * name
   */
  remember?: boolean;
}
