import { IsString, IsEmail, IsDate, IsOptional, IsEnum, IsBoolean } from "class-validator";
import { Type } from "class-transformer";
import { IsPastDate } from "~/common/decorators/is-past-date.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";

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
     * Determins whether user is banned
     * @example TRUE
     */
    @IsBoolean()
    banned: boolean;

    /**
     * Role of the user
     * @example "PARTICIPANT"
     */
    @ApiProperty({ enum: UserRole, enumName: "UserRole", example: UserRole.PARTICIPANT })
    @IsEnum(UserRole)
    role: UserRole;

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
    @IsPastDate()
    birthday: Date;
}
