import { Module } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { PrismaService } from "src/prisma.service";
import { FileService } from "src/file/file.service";
import { UserService } from "src/user/user.service";
import { MailService } from "src/mail/mail.service";

@Module({
    controllers: [EventController],
    providers: [EventService, PrismaService, FileService, UserService, MailService],
})
export class EventModule {}
