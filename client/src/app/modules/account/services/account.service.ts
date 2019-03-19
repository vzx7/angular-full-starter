import { Apollo } from 'apollo-angular';
import { handleError } from 'core/utils/handle-error';
import { RequestService } from 'modules/shared/services/request/request.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import accountConfig from '../account.configs';
import {
    createUser, deleteUser, queryUser, queryUsers, updateUser
} from '../account.gql.constants';
import { IPassword } from '../interfaces/i.password';
import { IQueryUser } from '../interfaces/i.query-user';
import { IQueryUsers } from '../interfaces/i.query-users';
import { IUser } from '../interfaces/i.user';
import { User } from '../models/user.model';

/**
 * Service for personal account.
 */
@Injectable()
export class AccountService {

  /**
   * Constructor
   * @param requestService requestService
   * @param apollo apollo-angular
   */
  constructor(
    private readonly requestService: RequestService,
    private readonly apollo: Apollo
  ) { }

  /**
   * Create user
   * @param user User data
   * @return  Observable<IUser>
   */
  public createUser(user: IUser): Observable<IUser> {
    return this.apollo
      .mutate({
        mutation: createUser,
        variables: {
          ...user
        },
        // refetchQueries: Updates the cache in order to refetch parts of the store
        // that may have been affected by the mutation
/*         refetchQueries: [
          {
            query: queryUsers
          }
        ] */
      })
      .pipe(
        map(({ data }: any) => data.createUser),
        catchError(handleError)
      );
  }

  /**
   * Receiving user data.
   * @param id User Id
   * @return Observable<IUser>
   */
  public getUser(id: string): Observable<IUser> {
    return this.apollo
    .watchQuery<IQueryUser>({
      query: queryUser,
      variables: {
        id
      }
    })
    .valueChanges.pipe(map((res) => res.data.user));
  }

  /**
   * Receiving users data.
   * @return Observable<IUser[]>
   */
  public getUsers(): Observable<IUser[]> {
    return this.apollo
      .watchQuery<IQueryUsers>({
        query: queryUsers
      })
      .valueChanges.pipe(map((res) => res.data.users));
  }

  /**
   * Edit User data
   * @param user User
   * @param complete Complete function
   * @return User
   */
  public updateUser(user: IUser, complete: Function): Observable<IUser> {
    return this.apollo
    .mutate({
      mutation: updateUser,
      variables: {
        ...user
      }
    })
    .pipe(
      map(({ data }: any) => data.updateUser),
      catchError(handleError)
    );
  }

  /**
   * Delete user
   * @param id User ID
   * @return Observable<boolean>
   */
  public  deleteUser(id: number): Observable<boolean> {
    return this.apollo
      .mutate({
        mutation: deleteUser,
        variables: {
          id
        }
      })
      .pipe(
        map(({ data }: any) => data.deleteUser),
        catchError(handleError)
      );
  }

  /**
   * Change password
   * @param password Password
   * @param user User
   * @param complete Complete function
   * @return Password
   */
  public changePassword(password: IPassword, user: User, complete: Function): Observable<User> {
    return this.requestService.put(`${accountConfig.api.updatePassword}/${user.id}`, password, complete);
  }
}
