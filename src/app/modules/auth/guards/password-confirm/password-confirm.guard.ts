import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../../services/auth.service';

/**
 * Сервис для проверки страницы подверждения смены пароля
 */
@Injectable()
export class PasswordConfirmGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  /**
   * Возможен ли переход по адресу
   * @param route роутер
   * @param state информация о запросе
   * @return boolean
   */
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return true;
    // TODO Добавить на бек запрос на подтверждения пользователя. Пока что отказались от этого
    // if (route.queryParams.code && route.queryParams.userid) {
    //   // Данная конструкция написана ввиду ошибки Uncaught Promise.
    //   return Observable.create((observer) => {
    //     this.authService.confirmPasswordReset(route.queryParams.code, route.queryParams.userid)
    //       .subscribe((res) => {
    //           observer.next(true);
    //         },
    //         (err) => {
    //           this.router.navigate(['/']);
    //           observer.next(false);
    //         });
    //   });
    // } else {
    //   this.router.navigate(['/']);

    //   return false;
    // }
  }
}
