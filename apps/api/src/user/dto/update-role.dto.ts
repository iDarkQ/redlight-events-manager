import { PickType } from "@nestjs/swagger";
import { UserDto } from "~/user/dto/user.dto";

export class UpdateRoleDto extends PickType(UserDto, ["role"] as const) {}
