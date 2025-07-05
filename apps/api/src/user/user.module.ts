import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "~/prisma.service";
import { JwtModule } from "@nestjs/jwt";
import { FileService } from "~/file/file.service";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "7d" },
        }),
    ],
    controllers: [UserController],
    providers: [UserService, PrismaService, FileService],
})
export class UserModule {}
