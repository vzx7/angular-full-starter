/**
 * Настройки модуля.
 */
interface AccountConfig {
  // Настройки api
  api: {
    read: string;
    update: string;
    updatePassword: string
  };
}

export const accountConfig: AccountConfig = {
  api: {
    read: 'read_user',
    update: 'update_user',
    updatePassword: 'update_user_password'
  }
};