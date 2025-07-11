import { OmitType } from "@nestjs/swagger";
import { EventDto } from "~/event/dto/event.dto";

export class CreateEventRequestDto extends OmitType(EventDto, [
    "id",
    "creatorId",
    "createdAt",
    "participants",
    "deleted",
    "deletedAt",
] as const) {}
