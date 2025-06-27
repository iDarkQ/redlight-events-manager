import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma.service";
import * as argon2 from "argon2";
import jwt, { JwtPayload } from "jsonwebtoken";
import { LoginUserDto, LoginUserResponseDto } from "src/user/dto/login-user.dto";
import { AuthorizeUserDto } from "src/user/dto/authorization-user.dto";
import { UserDto } from "@redlight-events-manager/constants/user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await argon2.hash(createUserDto.password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 1,
        });

        return await this.prisma.user.create({
            data: {
                ...createUserDto,
                role: "PARTICIPANT",
                profile: "",
                password: hashedPassword,
            },
        });
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginUserResponseDto> {
        const user = await this.prisma.user.findUnique({ where: { email: loginUserDto.email } });
        if (!user) {
            throw new NotFoundException("User with this email does not exist");
        }

        const isValid = await argon2.verify(user.password, loginUserDto.password);

        if (!isValid) {
            throw new UnauthorizedException("Wrong Password");
        }

        const token = jwt.sign(
            {
                uId: user.id,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" },
        );

        return { token };
    }

    async authorize(authorizeUserDto: AuthorizeUserDto): Promise<UserDto> {
        try {
            const decoded = jwt.verify(
                authorizeUserDto.token,
                process.env.JWT_SECRET as string,
            ) as JwtPayload;

            const user = await this.prisma.user.findUnique({
                where: { id: decoded.uId },
                omit: {
                    password: true,
                },
            });

            if (!user) {
                throw new NotFoundException("User does not exists");
            }

            return user;
        } catch (_) {
            throw new UnauthorizedException("Could not authorize your session");
        }
    }
}
