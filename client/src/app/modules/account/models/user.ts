/**
 * Модель данных для пользователя
 */
export interface User {
  /**
   * Id
   */
  id: string;
  /**
   * Фамилия
   */
  lastName: string;

  /**
   * Имя
   */
  firstName: string;

  /**
   * Отчество
   */
  patronymic: string;

  /**
   * Логин
   */
  login: string;

  /**
   * Почтовый адрес
   */
  email: string;

  /**
   * Пароль
   */
  password: string;
}
