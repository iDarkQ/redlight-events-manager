import { Controller, Get, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "src/user/dto/login-user.dto";
import { AuthorizeUserDto } from "src/user/dto/authorization-user.dto";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Get()
    async login(@Body() loginUserDto: LoginUserDto) {
        return await this.userService.login(loginUserDto);
    }

    @Get("auth")
    async authorize(@Body() authorizeUserDto: AuthorizeUserDto) {
        return await this.userService.authorize(authorizeUserDto);
    }
}
