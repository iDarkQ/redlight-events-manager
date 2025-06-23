import { IsString, IsEmail, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @Type(() => Date)
    @IsDate()
    birthday: Date;
}
