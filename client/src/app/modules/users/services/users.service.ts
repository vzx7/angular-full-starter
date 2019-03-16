import { Apollo } from 'apollo-angular';
import { handleError } from 'core/utils/handle-error';
import { RequestService } from 'modules/shared/services/request/request.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { IPassword } from '../interfaces/i.password';
import { IQueryUser } from '../interfaces/i.query-user';
import { IQueryUsers } from '../interfaces/i.query-users';
import { IUser } from '../interfaces/i.user';
import { User } from '../models/user.model';
import accountConfig from '../users.configs';
import {
    createUser, deleteUser, deleteUsers, queryUser, queryUsers, updateUser, uploadFile
} from '../users.gql.constants';
import { FileUploadService } from 'core/services/file-upload/file-upload.service';

/**
 * Service for users.
 */
@Injectable()
export class UsersService {

  /**
   * Constructor
   * @param requestService requestService
   * @param apollo apollo-angular
   * @param fileUploadService FileUploadService
   */
  constructor(
    private readonly requestService: RequestService,
    private readonly apollo: Apollo,
    private readonly fileUploadService: FileUploadService
  ) { }

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
        refetchQueries: [
          { query: queryUsers }
        ]
      })
      .pipe(
        map(({ data }: any) => data.createUser),
        catchError(handleError)
      );
  }

  /**
   * Edit User data
   * @param user User
   * @return User
   */
  public updateUser(user: IUser): Observable<IUser> {
    return this.apollo
      .mutate({
        mutation: updateUser,
        variables: {
          ...user
        },
        refetchQueries: [
          {
            query: queryUsers
          }
        ]
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
  public deleteUser(id: number): Observable<boolean> {
    return this.apollo
      .mutate({
        mutation: deleteUser,
        variables: {
          id
        },
        refetchQueries: [
          {
            query: queryUsers
          }
        ]
      })
      .pipe(
        map(({ data }: any) => data.deleteUser),
        catchError(handleError)
      );
  }

  /**
   * Delete users
   * @param ids User IDs
   * @return Observable<boolean>
   */
  public deleteUsers(ids: string[]): Observable<boolean> {
    return this.apollo
      .mutate({
        mutation: deleteUsers,
        variables: {
          ids
        },
        // refetchQueries: Updates the cache in order to refetch parts of the store
        // that may have been affected by the mutation
        refetchQueries: [
          {
            query: queryUsers
          }
        ]
      })
      .pipe(
        map(({ data }: any) => data.deleteUsers),
        catchError(handleError)
      );
  }

  public savePhoto(file: FileList): Observable<boolean> {
    return this.fileUploadService.upload(file).pipe(
      map(({ data }: any) => data),
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
    return this.requestService.put(`${accountConfig.api.updatePassword}/${user._id}`, password, complete);
  }
}
