import { PickType } from "@nestjs/swagger";
import { UserDto } from "src/user/dto/user.dto";

export class ParticipantDto extends PickType(UserDto, ["id", "name", "profile"] as const) {}
