import { IAccountConfig } from './interfaces/i.account-config';
/**
 * Settings account module.
 */
export default <IAccountConfig>{
  api: {
    read: 'read_user',
    update: 'update_user',
    updatePassword: 'update_user_password'
  }
};
