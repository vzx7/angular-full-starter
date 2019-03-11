import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AccessToken } from '../models/access-token';
import { authConfig } from '../auth.config';
import { Credential } from '../models/credential';
import { EmailRecovery } from '../models/email-recovery';
import { PasswordRecovery } from '../models/password-recovery';
import { RequestService } from '../../shared/services/request/request.service';
import { User } from '../models/user';

/**
 * Сервис для аутентификации
 */
@Injectable()
export class AuthService {

  constructor(
    private readonly requestService: RequestService,
    private readonly jwtService: JwtHelperService
  ) {
  }

  /**
   * Вход пользователя
   * @param credential Данные пользователя
   * @param complete Функция, которая вызывается в любом случае
   * @return Observable
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
   * Выход из системы
   */
  public logOut() {
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
  }

  /**
   * Запрос на сброс пароля
   * @param email Почта
   * @param complete Функция, которая вызывается в любом случае
   * @return Observable
   */
  public passwordReset(email: EmailRecovery, complete?: Function): Observable<number> {
    return this.requestService.post<number>(authConfig.api.passwordReset, complete, email, true);
  }

  /**
   * Подтверждение почты
   * @param code Ключ подверждения
   * @param userid идентификатор пользователя
   * @return Observable
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
   * Подтверждение смены пароля
   * @param code Ключ подверждения
   * @param userid идентификатор пользователя
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
   * Регистрация пользователя
   * @param user Данные пользователя
   * @param complete Функция, которая вызывается в любом случае
   * @return Observable
   */
  public register(user: User, complete?: Function): Observable<number> {
    return this.requestService.post<number>(authConfig.api.register, complete, user, true);
  }

  /**
   * Сброс пароля
   * @param recovery Данные для восстановления
   * @param complete Функция, которая вызывается в любом случае
   * @return Observable
   */
  public confirmResetPassword(recovery: PasswordRecovery, complete?: Function): Observable<number> {
    return this.requestService.post<number>(authConfig.api.confirm_password, complete, recovery, true);
  }

  /**
   * Проверка токена jwt
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
