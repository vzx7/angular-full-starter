/**
 * Модель данных для входа в систему
 */
export interface Credential {
  /**
   * Логин.
   */
  login: string;

  /**
   * Фамилия.
   */
  password: string;

  /**
   * Отчество.
   */
  rememberMe: boolean;
}
