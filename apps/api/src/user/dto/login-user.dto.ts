import { IsString, IsEmail } from "class-validator";

export class LoginUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class LoginUserResponseDto {
    @IsString()
    token: string;
}
