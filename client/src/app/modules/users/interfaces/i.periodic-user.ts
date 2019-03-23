import { IUser } from './i.user';

/**
 * Periodic user interfaces
 */
export interface IPeriodicUser extends IUser {
  /**
   * position in table
   */
  position?: number;
}
