import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { BaseUserDto } from './base-user.dto';

/**
 * DTO for Create User
 */
@InputType()
export class CreateUserDto extends BaseUserDto {
 @Field()
  @IsNotEmpty()
  password: string;
}
