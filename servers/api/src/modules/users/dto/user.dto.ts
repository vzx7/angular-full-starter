// tslint:disable-next-line: quotemark
import { IUserPhoto } from "../interfaces/i.user-photo";

/**
 * DTO for User
 */
export class UserDto {
  id?: string;
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  token?: string;
  role?: number;
  photo?: IUserPhoto;
}
