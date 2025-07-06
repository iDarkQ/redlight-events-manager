import { PickType } from "@nestjs/swagger";
import { UserDto } from "~/user/dto/user.dto";

export class BanUserDto extends PickType(UserDto, ["banned"] as const) {}
