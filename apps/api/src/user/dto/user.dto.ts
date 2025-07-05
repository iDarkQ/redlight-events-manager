import { IsString, IsEmail, IsDate, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class UserDto {
    /**
     * Unique identifier of the user
     * @example "cmcoyn1ld000008l4c8icbq3s"
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
     * @example "static/uploads/permanent/event-123-123.png"
     */
    @IsString()
    @IsOptional()
    profile: string | null;

    /**
     * Birthday of the user
     * @example "1990-01-01T00:00:00.000Z"
     */
    @Type(() => Date)
    @IsDate()
    birthday: Date;
}
