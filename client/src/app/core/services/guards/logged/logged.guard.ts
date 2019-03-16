import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

// import { AuthService } from '../../services/auth.service';

/**
 * Service to verify user authentication
 */
@Injectable()
export class LoggedGuard implements CanActivate {

  constructor(
   // private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  /**
   * Link Guardian
   * @param route Router
   * @param state request information
   * @return boolean
   */
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.router.navigate(['/auth/login']);

    return false;
/*     if (this.authService.loggedIn) {
      return true;
    } else {
      this.router.navigate(['/auth']);

      return false;
    } */
  }
}
