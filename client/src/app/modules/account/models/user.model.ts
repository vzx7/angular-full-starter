import { IUser } from '../interfaces/i.user';

export class User implements IUser {
  public id?: string;
  public firstName: string;
  public lastName: string;
  public login: string;
  public email: string;
  public password: string;
}
