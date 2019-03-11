/**
 * Модель данных для поиска
 */
export interface SearchEvent {
  /**
   * Событие
   */
  event: any;
  /**
   * Поисковое значение
   */
  query: string;
}
