import { IsNotEmpty, Length } from 'class-validator';

export class SignInUserDto {
    @IsNotEmpty()
    login: string;

    @Length(7, 100)
    password: string;
}