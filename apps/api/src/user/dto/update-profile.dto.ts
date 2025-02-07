import { PickType } from "@nestjs/swagger";
import { UserDto } from "src/user/dto/user.dto";

export class UpdateProfileDto extends PickType(UserDto, ["birthday", "profile"] as const) {}
