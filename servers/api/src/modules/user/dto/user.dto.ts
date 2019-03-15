import { RolesEntity } from '../../roles/roles.entity';

export class UserDto {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  token?: string;
  role?: RolesEntity;
}
