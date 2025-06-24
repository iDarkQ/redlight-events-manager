import { IsString, IsOptional, IsDate, IsInt, IsLatitude, IsLongitude } from "class-validator";
import { Type } from "class-transformer";

export class UpdateEventDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    date?: Date;

    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsInt()
    maxParticipants?: number;

    @IsOptional()
    @IsLatitude()
    latitude?: number;

    @IsOptional()
    @IsLongitude()
    longitude?: number;
}
