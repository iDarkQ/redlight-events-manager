import { Injectable, Logger } from "@nestjs/common";
import { UpdateEventDto } from "./dto/update-event.dto";
import { PrismaService } from "~/prisma.service";
import { EventDto } from "~/event/dto/event.dto";
import { CreateEventDto } from "~/event/dto/create-event.dto";
import { Cron, CronExpression } from "@nestjs/schedule";
import { join } from "path";
import { promises as fs } from "fs";

export const PARTICIPANT_SELECT = {
    id: true,
    name: true,
    profile: true,
    role: true,
    banned: true,
};

@Injectable()
export class EventService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createEventDto: CreateEventDto): Promise<EventDto> {
        return await this.prisma.event.create({
            data: {
                ...createEventDto,
                deleted: false,
                participants: {
                    connect: {
                        id: createEventDto.creatorId,
                    },
                },
            },
            include: {
                participants: { select: PARTICIPANT_SELECT },
            },
        });
    }

    async findAll() {
        return await this.prisma.event.findMany({
            where: { deleted: false },
            include: {
                participants: { select: PARTICIPANT_SELECT },
            },
        });
    }

    async findOne(id: string) {
        return await this.prisma.event.findUnique({
            where: { id },
            include: {
                participants: { select: PARTICIPANT_SELECT },
            },
        });
    }

    async update(id: string, updateEventDto: UpdateEventDto) {
        return await this.prisma.event.update({
            where: { id },
            data: updateEventDto,
            include: {
                participants: { select: PARTICIPANT_SELECT },
            },
        });
    }

    async remove(id: string) {
        return await this.prisma.event.update({
            where: { id },
            data: { deleted: true, deletedAt: new Date() },
            include: {
                participants: { select: PARTICIPANT_SELECT },
            },
        });
    }

    async joinEvent(eventId: string, userId: string) {
        return await this.prisma.event.update({
            where: { id: eventId },
            data: {
                participants: {
                    connect: { id: userId },
                },
            },
            include: {
                participants: { select: PARTICIPANT_SELECT },
            },
        });
    }

    async leaveEvent(eventId: string, userId: string) {
        return await this.prisma.event.update({
            where: { id: eventId },
            data: {
                participants: {
                    disconnect: { id: userId },
                },
            },
            include: {
                participants: { select: PARTICIPANT_SELECT },
            },
        });
    }

    @Cron(CronExpression.EVERY_12_HOURS)
    async cleanTmpFolder() {
        const tmpPath = join(process.cwd(), "static", "uploads", "tmp");

        try {
            const files = await fs.readdir(tmpPath);
            for (const file of files) {
                const filePath = join(tmpPath, file);
                const stat = await fs.lstat(filePath);

                if (stat.isDirectory()) {
                    await fs.rm(filePath, { recursive: true, force: true });
                } else {
                    await fs.unlink(filePath);
                }
            }
        } catch (err) {
            Logger.error(err);
        }
    }

    @Cron(CronExpression.EVERY_HOUR)
    async autoCompleteEvents() {
        try {
            const events = await this.findAll();

            for (const event of events) {
                if (event.date.getUTCDate() <= Date.now() && event.status === "PLANNED") {
                    await this.update(event.id, { status: "COMPLETED" });
                }
            }
        } catch (err) {
            Logger.error(err);
        }
    }
}
