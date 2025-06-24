import { IsString, IsOptional } from "class-validator";

export class LeaveEventDto {
    @IsString()
    @IsOptional()
    userId?: string;
}
