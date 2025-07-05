import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "~/prisma.service";
import * as argon2 from "argon2";
import jwt, { JwtPayload } from "jsonwebtoken";
import { LoginUserDto } from "~/user/dto/login-user.dto";
import { UserDto } from "~/user/dto/user.dto";
import { UpdateProfileDto } from "~/user/dto/update-profile.dto";
import { JwtTokenDto } from "~/user/dto/jwt-token.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async signUp(createUserDto: CreateUserDto): Promise<JwtTokenDto> {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [{ name: createUserDto.name }, { email: createUserDto.email }],
            },
        });

        if (existingUser) {
            if (existingUser.email === createUserDto.email) {
                throw new ConflictException("User with this email already exists");
            }
            if (existingUser.name === createUserDto.name) {
                throw new ConflictException("User with this name already exists");
            }
            throw new ConflictException("User already exists");
        }

        const hashedPassword = await argon2.hash(createUserDto.password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 1,
        });

        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
                role: "PARTICIPANT",
                profile: "",
                password: hashedPassword,
            },
        });

        const token = jwt.sign(
            {
                uId: user.id,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" },
        );

        return { token };
    }

    async signIn(loginUserDto: LoginUserDto): Promise<JwtTokenDto> {
        const user = await this.prisma.user.findUnique({
            where: { email: loginUserDto.email },
        });
        if (!user) {
            throw new NotFoundException("User with this email does not exist");
        }

        const isValid = await argon2.verify(user.password, loginUserDto.password);

        if (!isValid) {
            throw new UnauthorizedException("Provided password was wrong");
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

    async authorize(authorizeUserDto: JwtTokenDto): Promise<UserDto> {
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
            throw new NotFoundException("This user does not exists");
        }

        return user;
    }

    async update(id: string, updateProfileDto: UpdateProfileDto) {
        return await this.prisma.user.update({
            where: { id },
            data: updateProfileDto,
        });
    }

    async fetchAll() {
        return await this.prisma.user.findMany();
    }
}
