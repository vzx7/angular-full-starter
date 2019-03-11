import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

// import { AuthService } from '../../services/auth.service';

/**
 * Сервис для проверки аутентификации пользователя
 */
@Injectable()
export class LoggedGuard implements CanActivate {

  constructor(
   // private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  /**
   * Возможен ли переход по адресу
   * @param route роутер
   * @param state информация о запросе
   * @return boolean
   */
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // this.router.navigate(['/account/main']);
    return true;
/*     if (this.authService.loggedIn) {
      return true;
    } else {
      this.router.navigate(['/auth']);

      return false;
    } */
  }
}
