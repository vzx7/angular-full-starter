import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ToastService } from '../../core/services/toast/toast.service';

/**
 * Errors handler
 */
@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(
    private readonly injector: Injector,
  ) { }

  /**
   * Errors handler
   * @param error Error
   */
  public handleError(error: Error | HttpErrorResponse): void {

    if (error instanceof HttpErrorResponse) {
      // Server error
      if (!navigator.onLine) {
        return this.showError('No internet connection', 'No internet connection');
      }

      // Http error
      const errorStatus = 400;
      let errorMessage = '500';
      if (error.status === errorStatus) {
        errorMessage = error.error;
      }

      return this.showError(error, 'Error from server');
    } else {
      // Client error
      return this.showError(error, error.message);
    }
  }

  /**
   * Show errors
   * @param toConsole Error output to console
   * @param toUser Error output for user
   */
  private showError(toConsole: any, toUser: string): void {
    const toastService = this.injector.get(ToastService);
    if (!environment.production) {
      console.error(toConsole);
    }
    toastService.showError(toUser);
  }

}
