import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "src/user/dto/login-user.dto";
import { AuthorizeUserDto } from "src/user/dto/authorization-user.dto";
import {
    ApiConflictResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { JwtTokenResponse } from "src/user/dto/jwt-token-response.dto";
import { UserDto } from "src/user/dto/user.dto";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("signUp")
    @ApiOkResponse({ type: JwtTokenResponse, description: "JWT Token" })
    @ApiConflictResponse({ description: "User already exists" })
    async signUp(@Body() createUserDto: CreateUserDto): Promise<JwtTokenResponse | null> {
        return await this.userService.signUp(createUserDto);
    }

    @Post("signIn")
    @ApiOkResponse({ type: JwtTokenResponse, description: "JWT Token" })
    @ApiUnauthorizedResponse({ description: "Wrong Password" })
    @ApiNotFoundResponse({ description: "User with this email does not exist" })
    async signIn(@Body() loginUserDto: LoginUserDto): Promise<JwtTokenResponse | null> {
        return await this.userService.signIn(loginUserDto);
    }

    @Post("auth")
    @ApiOkResponse({ type: UserDto, description: "Returns user object" })
    @ApiNotFoundResponse({ description: "User does not exists" })
    @ApiUnauthorizedResponse({ description: "Could not authorize your session" })
    async authorize(@Body() authorizeUserDto: AuthorizeUserDto) {
        return await this.userService.authorize(authorizeUserDto);
    }
}
