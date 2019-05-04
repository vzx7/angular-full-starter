import { IsNotEmpty } from 'class-validator';
import { Field, InputType, ID } from 'type-graphql';

/**
 * DTO for Update User
 */
@InputType()
export class UpdateUserPhotoDto {
  @Field(type => ID)
  @IsNotEmpty()
  userId: string;

  @Field(type => String)
  @IsNotEmpty()
  fileId: string;

  @Field(type => String)
  @IsNotEmpty()
  fileName: string;
}
