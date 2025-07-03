import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { UpdateEventDto } from "./dto/update-event.dto";
import { PrismaService } from "src/prisma.service";
import { EventDto } from "src/event/dto/event.dto";
import { CreateEventDto } from "src/event/dto/create-event.dto";
import { Cron, CronExpression } from "@nestjs/schedule";
import { join } from "path";
import { promises as fs } from "fs";

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
            include: { participants: { select: { id: true, name: true, profile: true } } },
        });
    }

    async findAll() {
        return await this.prisma.event.findMany({
            where: { deleted: false },
            include: { participants: { select: { id: true, name: true, profile: true } } },
        });
    }

    async findOne(id: string) {
        return await this.prisma.event.findUnique({
            where: { id },
            include: { participants: { select: { id: true, name: true, profile: true } } },
        });
    }

    async update(id: string, updateEventDto: UpdateEventDto) {
        return await this.prisma.event.update({
            where: { id },
            data: updateEventDto,
            include: { participants: { select: { id: true, name: true, profile: true } } },
        });
    }

    async remove(id: string) {
        return await this.prisma.event.update({
            where: { id },
            data: { deleted: true, deletedAt: new Date() },
            include: { participants: { select: { id: true, name: true, profile: true } } },
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
            include: { participants: { select: { id: true, name: true, profile: true } } },
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
            include: { participants: { select: { id: true, name: true, profile: true } } },
        });
    }

    async setPhoto(eventId: string, filename: string): Promise<EventDto> {
        const event = await this.findOne(eventId);
        if (!event) throw new NotFoundException("Event not found");

        event.banner = `/uploads/banner/${filename}`;
        return await this.update(eventId, event);
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
}
