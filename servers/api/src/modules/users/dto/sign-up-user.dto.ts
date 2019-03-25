import { IsNotEmpty, Length } from 'class-validator';

export class SignUpUserDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    login: string;

    @Length(7, 100)
    password: string;
}
