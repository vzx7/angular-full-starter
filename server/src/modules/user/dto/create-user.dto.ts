import { UserType } from '../enums/user-type.enum';

export class UserDto {
  readonly name: string;
  readonly nickname: string;
  readonly email: string;
  readonly type: UserType;
  readonly token: string;
}
