import { IsEmail, IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

/**
 * Base DTO for User action
 */
@InputType()
export class BaseUserDto {
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
