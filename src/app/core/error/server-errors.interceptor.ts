import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Перехватчик обработки ошибок с сервера
 */
@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {
  constructor(
  ) { }
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((err) => {
          throw err;
        }));
  }
}
