export class UserDto {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  token?: string;
  // TODO Нужен тип
  role?: any;
}
