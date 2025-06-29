import { IsString } from "class-validator";

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
