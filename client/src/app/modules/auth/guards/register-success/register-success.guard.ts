import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../../services/auth.service';

/**
 * Service to check the page successful letter.
 */
@Injectable()
export class RegisterSuccessGuard implements CanActivate {

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
    return true;
  }
}
