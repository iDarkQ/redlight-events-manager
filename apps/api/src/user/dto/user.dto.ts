import { IsString, IsEmail, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class UserDto {
    /**
     * Unique identifier of the user
     * @example "ckv9p34s50000svef8bl7w2gb"
     */
    @IsString()
    id: string;

    /**
     * Name of the user
     * @example "John Doe"
     */
    @IsString()
    name: string;

    /**
     * Email address of the user
     * @example "john.doe@example.com"
     */
    @IsEmail()
    email: string;

    /**
     * Role of the user
     * @example "admin"
     */
    @IsString()
    role: string;

    /**
     * Profile description or URL of the user
     * @example "https://example.com/profile/johndoe"
     */
    @IsString()
    profile: string;

    /**
     * Birthday of the user
     * @example "1990-01-01T00:00:00.000Z"
     */
    @Type(() => Date)
    @IsDate()
    birthday: Date;
}
