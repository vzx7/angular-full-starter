/**
 * Модель данных для стойкости пароля
 */
export interface PasswordStrength {
  /**
   * Длина больше 8 символов
   */
  length: boolean;
  /**
   * Имеется цифра
   */
  digits: boolean;
  /**
   * Имеется заглавная буква
   */
  capital: boolean;
  /**
   * Имеется строчная буква
   */
  lowerCase: boolean;
}
