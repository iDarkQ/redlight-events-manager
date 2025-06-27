import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto, LoginUserResponseDto } from "src/user/dto/login-user.dto";
import { AuthorizeUserDto } from "src/user/dto/authorization-user.dto";
import { ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { UserDto } from "@redlight-events-manager/constants/user.dto";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("signUp")
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Post("signIn")
    @ApiOkResponse({ type: LoginUserResponseDto, description: "JWT Token" })
    @ApiUnauthorizedResponse({ description: "Wrong Password" })
    @ApiNotFoundResponse({ description: "User with this email does not exist" })
    async login(@Body() loginUserDto: LoginUserDto): Promise<LoginUserResponseDto | null> {
        return await this.userService.login(loginUserDto);
    }

    @Post("auth")
    @ApiOkResponse({ type: UserDto, description: "Returns user object" })
    @ApiNotFoundResponse({ description: "User does not exists" })
    @ApiUnauthorizedResponse({ description: "Could not authorize your session" })
    async authorize(@Body() authorizeUserDto: AuthorizeUserDto) {
        return await this.userService.authorize(authorizeUserDto);
    }
}
