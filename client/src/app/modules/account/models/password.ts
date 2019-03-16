/**
 * Модель данных для пароля
 */
export interface Password {
  /**
   * Текущий пароль
   */
  password: string;

  /**
   * Новый пароль
   */
  newPassword: string;

  /**
   * Повтор нового пароля
   */
  repeatNewPassword: string;
}
