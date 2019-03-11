/**
 * Настройки модуля аутентификации.
 */
interface AuthConfig {
  // Настройки api
  api: {
    // Подтверждение пароля
    confirm_password: string,
    // Подтверждение регистрации
    confirm_register: string,
    // Аутентификация
    login: string;
    // Регистрация
    register: string;
    // Отправка почты для сброса пароля
    passwordReset: string;
  };
}

export const authConfig: AuthConfig = {
  api: {
    confirm_password: 'confirm_password_reset',
    confirm_register: 'confirm_register',
    login: 'login',
    passwordReset: 'password_reset',
    register: 'register',
  }
};
