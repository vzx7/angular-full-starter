import { Document } from 'mongoose';
import { UserType } from '../enums/user-type.enum';

export interface User extends Document {
  readonly name: string;
  readonly nickname: string;
  readonly email: string;
  readonly type: UserType;
  readonly token: string;
}
