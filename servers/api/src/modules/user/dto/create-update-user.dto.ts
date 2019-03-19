import { IsNotEmpty } from 'class-validator';
import { CreateUserInput } from 'graphql.schema';

export class CreateUpdateUserDto extends CreateUserInput {
  @IsNotEmpty()
  password: string;

  roleName?: string;
}
