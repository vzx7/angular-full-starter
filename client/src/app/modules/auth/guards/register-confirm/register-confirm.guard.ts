import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../../services/auth.service';

/**
 * Service to check the confirmation page during registration.
 */
@Injectable()
export class RegisterConfirmGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  /**
   * Link Guardian.
   * @param route Router.
   * @param state Request info.
   * @return booleanan
   */
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (route.queryParams.code && route.queryParams.userid) {
      // This construction was written due to Uncaught Promise error.
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
