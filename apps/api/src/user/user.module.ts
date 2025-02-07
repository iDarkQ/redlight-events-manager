import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "src/prisma.service";
import { JwtModule } from "@nestjs/jwt";
import { FileService } from "src/file/file.service";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "60s" },
        }),
    ],
    controllers: [UserController],
    providers: [UserService, PrismaService, FileService],
})
export class UserModule {}
