import { PartialType, OmitType } from "@nestjs/swagger"; // or '@nestjs/mapped-types'
import { EventDto } from "~/event/dto/event.dto";

export class UpdateEventDto extends PartialType(
    OmitType(EventDto, [
        "id",
        "createdAt",
        "creatorId",
        "participants",
        "deleted",
        "deletedAt",
    ] as const),
) {}
