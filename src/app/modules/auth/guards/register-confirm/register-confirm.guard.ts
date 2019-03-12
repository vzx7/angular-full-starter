import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../../services/auth.service';

/**
 * Сервис для проверки страницы подверждения почты при регистрации
 */
@Injectable()
export class RegisterConfirmGuard implements CanActivate {

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
    if (route.queryParams.code && route.queryParams.userid) {
      // Данная конструкция написана ввиду ошибки Uncaught Promise.
      return Observable.create((observer) => {
        this.authService.confirmEmail(route.queryParams.code, route.queryParams.userid)
        .subscribe(
          (res) => {
            observer.next(true);
          },
          (err) => {
            this.router.navigate(['/']);
            observer.next(false);
        });
      });
    } else {
      this.router.navigate(['/']);

      return false;
    }
  }
}
