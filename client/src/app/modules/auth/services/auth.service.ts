import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { RequestService } from '../../shared/services/request/request.service';
import { authConfig } from '../auth.config';
import { AccessToken } from '../models/access-token';
import { Credential } from '../models/credential';
import { EmailRecovery } from '../models/email-recovery';
import { PasswordRecovery } from '../models/password-recovery';
import { User } from '../models/user';

/**
 * Authentication Service.
 */
@Injectable()
export class AuthService {
  /**
   * Constructor
   * @param requestService requestService
   * @param jwtService jwtService
   */
  constructor(
    private readonly requestService: RequestService,
    private readonly jwtService: JwtHelperService
  ) {
  }

  /**
   * User login.
   * @param credential User data.
   * @param complete Complete function.
   * @return Observable.
   */
  public login(credential: Credential, complete?: Function): Observable<AccessToken> {

    return this.requestService.post<AccessToken>(authConfig.api.login, complete, credential, true)
      .pipe(tap((res) => {
        if (credential.rememberMe) {
          localStorage.setItem('access_token', res.access_token);
        } else {
          sessionStorage.setItem('access_token', res.access_token);
        }

        return res;
      }));
  }

  /**
   * Sign Out.
   */
  public logOut() {
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
  }

  /**
   * Password reset request.
   * @param email Email.
   * @param complete Complete function.
   * @return Observable.
   */
  public passwordReset(email: EmailRecovery, complete?: Function): Observable<number> {
    return this.requestService.post<number>(authConfig.api.passwordReset, complete, email, true);
  }

  /**
   * Email Verification.
   * @param code Confirmation key.
   * @param userid User ID.
   * @return Observable.
   */
  public confirmEmail(code: string, userid: string): Observable<boolean> {
    return this.requestService.post<boolean>(authConfig.api.confirm_register, () => {},
      { code, userid }, true)
      .pipe(
        map((res) => {
          return true;
        })
      );
  }

  /**
   * Password change confirmation.
   * @param code Confirmation key.
   * @param userid User ID.
   * @return Observable
   */
  public confirmPasswordReset(code: string, userid: string): Observable<boolean> {
    return this.requestService.post<boolean>(authConfig.api.confirm_password, () => { },
      { code, userid }, true)
      .pipe(
        map((res) => {
          return true;
      }));
  }

  /**
   * User registration.
   * @param user User ID.
   * @param complete Complete function.
   * @return Observable
   */
  public register(user: User, complete?: Function): Observable<number> {
    return this.requestService.post<number>(authConfig.api.register, complete, user, true);
  }

  /**
   * Password reset.
   * @param recovery Data to recover.
   * @param complete Complete function.
   * @return Observable
   */
  public confirmResetPassword(recovery: PasswordRecovery, complete?: Function): Observable<number> {
    return this.requestService.post<number>(authConfig.api.confirm_password, complete, recovery, true);
  }

  /**
   * Token test jwt.
   * @return boolean
   */
  public get loggedIn(): boolean {
    try {
      let token = sessionStorage.getItem('access_token');
      if (!token) {
        token = localStorage.getItem('access_token');
      }

      return !this.jwtService.isTokenExpired(token);
    } catch (e) {
      return false;
    }
  }

}
