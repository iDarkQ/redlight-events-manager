import { Module } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { PrismaService } from "~/prisma.service";
import { FileService } from "~/file/file.service";
import { UserService } from "~/user/user.service";
import { MailService } from "~/mail/mail.service";

@Module({
    controllers: [EventController],
    providers: [EventService, PrismaService, FileService, UserService, MailService],
})
export class EventModule {}
