/**
 * Модель данных для пользователя
 */
export interface User {
  /**
   * Имя.
   */
  firstName: string;

  /**
   * Фамилия.
   */
  lastName: string;

  /**
   * Отчество.
   */
  patronymic: string;

  /**
   * Почтовый адрес.
   */
  email: string;

  /**
   * Пароль
   */
  password: string;
}
