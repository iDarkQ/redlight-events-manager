import { OmitType } from "@nestjs/swagger";
import { EventDto } from "src/event/dto/event.dto";

export class CreateEventDto extends OmitType(EventDto, [
    "id",
    "createdAt",
    "participants",
    "deleted",
    "deletedAt",
] as const) {}
