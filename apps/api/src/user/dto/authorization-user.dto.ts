import { IsString } from "class-validator";

export class AuthorizeUserDto {
    @IsString()
    token: string;
}
