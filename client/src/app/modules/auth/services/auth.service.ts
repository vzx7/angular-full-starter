import { Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { RequestService } from '../../shared/services/request/request.service';
import { authConfig } from '../auth.config';
import { IAccessToken } from '../interfaces/i.access-token';
import { ICredential } from '../interfaces/i.credential';
import { IEmailRecovery } from '../interfaces/i.email-recovery';
import { IPasswordRecovery } from '../interfaces/i.password-recovery';
import { IUser } from '../interfaces/i.user';
import { Apollo } from 'apollo-angular';
import { ISignUpContext } from 'modules/account/interfaces/i.sign-up-context';
import { ICredentials } from 'modules/account/interfaces/i.credential';
import { signUp } from '../auth.gql.constans';
import { handleError } from 'core/utils/handle-error';

/**
 * Authentication Service.
 */
@Injectable()
export class AuthService {

  public authenticationState = new Subject<any>();
  private credentials: ICredentials | null;
  /*   private _userIdentity: IUser;
    private isAuthenticated = false; */
  private readonly credentialsKey = 'credentials';

  /**
   * Constructor
   * @param requestService requestService
   * @param jwtService jwtService
   * @param apollo Apollo Angular
   */
  constructor(
    private readonly requestService: RequestService,
    private readonly jwtService: JwtHelperService,
    private readonly apollo: Apollo
  ) {
  }

  /**
   * User login.
   * @param credential User data.
   * @param complete Complete function.
   * @return Observable.
   */
  public login(credential: ICredential, complete?: Function): Observable<IAccessToken> {

    return this.requestService.post<IAccessToken>(authConfig.api.login, complete, credential, true)
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
  public passwordReset(email: IEmailRecovery, complete?: Function): Observable<number> {
    return this.requestService.post<number>(authConfig.api.passwordReset, complete, email, true);
  }

  /**
   * Email Verification.
   * @param code Confirmation key.
   * @param userid User ID.
   * @return Observable.
   */
  public confirmEmail(code: string, userid: string): Observable<boolean> {
    return this.requestService.post<boolean>(authConfig.api.confirm_register, () => { },
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
  public register(user: IUser, complete?: Function): Observable<number> {
    return this.requestService.post<number>(authConfig.api.register, complete, user, true);
  }

  /**
   * Password reset.
   * @param recovery Data to recover.
   * @param complete Complete function.
   * @return Observable
   */
  public confirmResetPassword(recovery: IPasswordRecovery, complete?: Function): Observable<number> {
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

  /**
   * Create and authenticate the users.
   * @param context The signUp parameters.
   * @return The users credentials.
   */
  public signUp(context: ISignUpContext): Observable<ICredentials | any> {
    const user = {
      username: context.firstName,
      token: '',
      remember: context.remember
    };

    return this.apollo
      .mutate({
        mutation: signUp,
        variables: {
          ...context
        }
      })
      .pipe(
        map(({ data }: any) => {
          user.token = data.signUp.token;
          this.setCredentials(user, context.remember);

          return user;
        }),
        catchError(handleError)
      );
  }

  /**
   * Sets the users credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The users credentials.
   * @param remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: ICredentials, remember?: boolean) {
    this.credentials = credentials || null;

    if (this.credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(this.credentialsKey, JSON.stringify(this.credentials));
    } else {
      sessionStorage.removeItem(this.credentialsKey);
      localStorage.removeItem(this.credentialsKey);
    }

    this.authenticationState.next(this.credentials);
  }
}
