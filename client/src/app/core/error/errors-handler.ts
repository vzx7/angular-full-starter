import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ToastService } from '../../core/services/toast/toast.service';

/**
 * Обработчик ошибок
 */
@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(
    private readonly injector: Injector,
  ) { }

  /**
   * Обработка событий
   * @param error Ошибка
   */
  public handleError(error: Error | HttpErrorResponse): void {

    if (error instanceof HttpErrorResponse) {
      // Серверная ошибка
      if (!navigator.onLine) {
        return this.showError('Отсутствует интернет соединение', 'Отсутствует интернет соединение');
      }

      // Http Ошибка
      const errorStatus = 400;
      let errorMessage = '500';
      if (error.status === errorStatus) {
        errorMessage = error.error;
      }

      return this.showError(error, 'Ошибка с сервера');
    } else {
      // Клиентская ошибка
      return this.showError(error, error.message);
    }
  }

  /**
   * Показ ошибок
   * @param toConsole Вывод ошибки в консоль
   * @param toUser Вывод ошибки пользователю
   */
  private showError(toConsole: any, toUser: string): void {
    const toastService = this.injector.get(ToastService);
    if (!environment.production) {
      console.error(toConsole);
    }
    toastService.showError(toUser);
  }

}
