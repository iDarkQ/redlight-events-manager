import { IsString, IsDate, IsNumber, IsArray, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

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
     * Date of the event
     * @example "2024-07-01T18:00:00.000Z"
     */
    @IsDate()
    @Type(() => Date)
    date: Date;

    /**
     * Type of the event
     * @example "MEETING"
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
    @IsArray()
    @Type(() => ParticipantDto)
    participants: ParticipantDto[];


    /**
     * ID of the event creator
     * @example "user1"
     */
    @IsString()
    creatorId: string;

    /**
     * Status of the event
     * @example "PLANNED"
     */
    @IsEnum(["PLANNED", "COMPLETED", "CANCELLED"])
    status: "PLANNED" | "COMPLETED" | "CANCELLED";

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
}

export class ParticipantDto {
    /**
     * Unique identifier of the participant
     * @example "user1"
     */
    @IsString()
    id: string;

    /**
     * Name of the participant
     * @example "Alice"
     */
    @IsString()
    name: string;
}