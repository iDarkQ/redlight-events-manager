import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "~/user/dto/create-user.dto";

export class LoginUserDto extends PickType(CreateUserDto, ["email", "password"] as const) {}
