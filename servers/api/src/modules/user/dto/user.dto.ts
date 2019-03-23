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
}
