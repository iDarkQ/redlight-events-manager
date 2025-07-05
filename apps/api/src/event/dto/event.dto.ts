import {
    IsString,
    IsDate,
    IsNumber,
    IsArray,
    IsEnum,
    ValidateNested,
    IsBoolean,
    IsOptional,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { ParticipantDto } from "~/user/dto/participant.dto";
import { EventStatus } from "@prisma/client";

export class EventDto {
    /**
     * Unique identifier of the event
     * @example "ckv9p34s50000svef8bl7w2gb"
     */
    @IsString()
    id: string;

    /**
     * Title of the event
     * @example "Annual Meetup"
     */
    @IsString()
    title: string;

    /**
     * Description of the event
     * @example "A gathering for all members."
     */
    @IsString()
    description: string;

    /**
     * Date when the event was created
     * @example "2024-06-25T12:00:00.000Z"
     */
    @IsDate()
    @Type(() => Date)
    createdAt: Date;

    /**
     * Date when event happens
     * @example "2024-07-01T18:00:00.000Z"
     */
    @IsDate()
    @Type(() => Date)
    date: Date;

    /**
     * Type of the event
     * @example "Football"
     */
    @IsString()
    type: string;

    /**
     * Maximum number of participants
     * @example 100
     */
    @IsNumber()
    maxParticipants: number;

    /**
     * List of participant objects
     * @example [{ "id": "user1", "name": "Alice" }, { "id": "user2", "name": "Bob" }]
     */
    @ApiProperty({
        type: ParticipantDto,
        isArray: true,
        example: [
            { id: "user1", name: "Alice" },
            { id: "user2", name: "Bob" },
        ],
    })
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => ParticipantDto)
    participants: ParticipantDto[];

    /**
     * ID of the event creator
     * @example "ckv9p34s50000svef8bl7w2gb"
     */
    @IsString()
    creatorId: string;

    /**
     * Status of the event
     * @example "PLANNED"
     */
    @ApiProperty({ enum: EventStatus, enumName: "EventStatus", example: EventStatus.PLANNED })
    @IsEnum(EventStatus)
    status: EventStatus;

    /**
     * Longitude of the event location
     * @example 19.9449799
     */
    @IsNumber()
    longitude: number;

    /**
     * Latitude of the event location
     * @example 50.0646501
     */
    @IsNumber()
    latitude: number;

    /**
     * Name of the event location
     * @example Alma Coimbra
     */
    @IsString()
    location: string;

    /**
     * Is event soft deleted
     * @example false
     */
    @IsBoolean()
    deleted: boolean;

    /**
     * Deletion date
     * @example "2024-07-01T18:00:00.000Z"
     */
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    deletedAt: Date | null;

    /**
     * Link to the event banner
     * @example /static/uploads/permanent/banners/event-123-123.png
     */
    @IsString()
    @IsOptional()
    banner: string | null;
}
