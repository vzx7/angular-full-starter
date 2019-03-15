
import { IsNotEmpty } from 'class-validator';

export class CreateUpdateUserDto {
  id?: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  password?: string;

  roleName?: string;
}