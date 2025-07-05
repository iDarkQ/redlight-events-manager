import { IsString, IsEmail, IsDate, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Type } from "class-transformer";

export class CreateUserDto {
    /**
     * User's full name.
     * @example "John Doe"
     */
    @IsString()
    @IsNotEmpty({ message: "Name is required" })
    @MinLength(2, { message: "Name must be at least 2 characters" })
    @MaxLength(50, { message: "Name must be at most 50 characters" })
    name: string;

    /**
     * User's email address.
     * @example "john.doe@example.com"
     */
    @IsEmail({}, { message: "Invalid email address" })
    email: string;

    /**
     * User's account password.
     * Must be between 6 and 100 characters.
     * @example "securePassword123"
     */
    @IsString()
    @MinLength(6, { message: "Password must be at least 6 characters" })
    @MaxLength(100, { message: "Password must be at most 100 characters" })
    password: string;

    /**
     * User's date of birth.
     * ISO 8601 date format.
     * @example "1990-05-15T00:00:00.000Z"
     */
    @Type(() => Date)
    @IsDate({ message: "Invalid date format for birthday" })
    birthday: Date;
}
