import { User } from 'modules/account/models/user';
import { RequestService } from 'modules/shared/services/request/request.service';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { accountConfig } from '../account.configs';
import { Password } from '../models/password';

/**
 * Service for personal account.
 */
@Injectable()
export class AccountService {

  /**
   * Constructor
   * @param requestService requestService
   */
  constructor(
    private readonly requestService: RequestService
  ) { }

  /**
   * Receiving user data.
   * @param id User Id
   * @param complete Complete function
   * @return User
   */
  public getUser(id: string, complete: Function): Observable<User> {
    return this.requestService.get(`${accountConfig.api.read}/${id}`, complete);
  }

  /**
   * Edit User data
   * @param user User
   * @param complete Complete function
   * @return User
   */
  public updateUser(user: User, complete: Function): Observable<User> {
    return this.requestService.put(`${accountConfig.api.update}/${user.id}`, user, complete);
  }

  /**
   * Change password
   * @param password Password
   * @param user User
   * @param complete Complete function
   * @return Password
   */
  public changePassword(password: Password, user: User, complete: Function): Observable<User> {
    return this.requestService.put(`${accountConfig.api.updatePassword}/${user.id}`, password, complete);
  }
}
