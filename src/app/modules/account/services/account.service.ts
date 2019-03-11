import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RequestService } from 'modules/shared/services/request/request.service';
import { User } from 'modules/account/models/user';
import { accountConfig } from '../account.configs';
import { Password } from '../models/password';

/**
 * Сервис для личного кабинета
 */
@Injectable()
export class AccountService {

  /**
   * Конструктрор
   * @param requestService Сервис для связи с бекендом
   */
  constructor(
    private readonly requestService: RequestService
  ) { }

  /**
   * Получение данных пользователя
   * @param id Идентфиикатор пользователя
   * @param complete Функция завершения
   * @return Пользователь
   */
  public getUser(id: string, complete: Function): Observable<User> {
    return this.requestService.get(`${accountConfig.api.read}/${id}`, complete);
  }

  /**
   * Редактирование данных пользователя
   * @param user Пользователя
   * @param complete Функция завершения
   * @return Пользователь
   */
  public updateUser(user: User, complete: Function): Observable<User> {
    return this.requestService.put(`${accountConfig.api.update}/${user.id}`, user, complete);
  }

  /**
   * Изменение пароля
   * @param password Пароль
   * @param user Пользователь
   * @param complete Функция завершения
   * @return Пароль
   */
  public changePassword(password: Password, user: User, complete: Function): Observable<User> {
    return this.requestService.put(`${accountConfig.api.updatePassword}/${user.id}`, password, complete);
  }
}
