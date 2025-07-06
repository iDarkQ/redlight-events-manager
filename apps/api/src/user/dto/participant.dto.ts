import { PickType } from "@nestjs/swagger";
import { UserDto } from "~/user/dto/user.dto";

export class ParticipantDto extends PickType(UserDto, [
    "id",
    "name",
    "profile",
    "role",
    "banned",
] as const) {}
