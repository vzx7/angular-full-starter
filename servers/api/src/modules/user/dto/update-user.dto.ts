import { IsNotEmpty } from 'class-validator';
import { Field, InputType, ID } from 'type-graphql';
import { BaseUserDto } from './base-user.dto';

/**
 * DTO for Update User
 */
@InputType()
export class UpdateUserDto extends BaseUserDto {
  @Field(type => ID)
  @IsNotEmpty()
  id: string;
}
