import { IsString, IsOptional } from "class-validator";

export class LeaveEventDto {
    /**
     * Unique identifier of the user
     * @example "ckv9p34s50000svef8bl7w2gb"
     */
    @IsString()
    @IsOptional()
    userId?: string;
}
