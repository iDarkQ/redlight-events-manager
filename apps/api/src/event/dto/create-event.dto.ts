import { IsLongitude, IsLatitude, IsString, IsDate, IsInt } from "class-validator";
import { Type } from "class-transformer";

class BaseEventDto {
    @IsString() title: string;
    @IsString() description: string;

    @Type(() => Date)
    @IsDate()
    date: Date;

    @IsString() type: string;
    @IsInt() maxParticipants: number;

    @IsLatitude() latitude: number;
    @IsLongitude() longitude: number;
}

export class CreateEventDto extends BaseEventDto {
    @IsString() creatorId: string;
}

export class CreateEventRequestDto extends BaseEventDto {}
