import { Document } from 'mongoose';
import { IUserPhoto } from './i.user-photo';

export interface IUser extends Document {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly login: string;
  readonly password?: string;
  readonly photo?: IUserPhoto;
}
