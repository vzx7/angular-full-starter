import { IsEmail, IsNotEmpty } from 'class-validator';
import { UpdateUserInput } from 'graphql.schema';
import { Field, InputType, ID } from 'type-graphql';

/**
 * DTO for Update User
 */
@InputType()
export class UpdateUserDto extends UpdateUserInput {
  @Field(type => ID)
  @IsNotEmpty()
  id: string;

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
}
