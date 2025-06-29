import { OmitType } from "@nestjs/swagger";
import { EventDto } from "src/event/dto/event.dto";

export class CreateEventRequestDto extends OmitType(EventDto, [
    "id",
    "creatorId",
    "createdAt",
    "participants",
] as const) {}
