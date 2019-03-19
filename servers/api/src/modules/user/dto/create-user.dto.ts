import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateUserInput } from 'graphql.schema';
import { Field, InputType } from 'type-graphql';

/**
 * DTO for Create User
 */
@InputType()
export class CreateUserDto extends CreateUserInput {
  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  login: string;

 @Field()
  @IsNotEmpty()
  password: string;
}
