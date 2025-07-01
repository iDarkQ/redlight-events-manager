import { Injectable } from "@nestjs/common";
import { UpdateEventDto } from "./dto/update-event.dto";
import { PrismaService } from "src/prisma.service";
import { EventDto } from "src/event/dto/event.dto";
import { CreateEventDto } from "src/event/dto/create-event.dto";

@Injectable()
export class EventService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createEventDto: CreateEventDto): Promise<EventDto> {
        return await this.prisma.event.create({
            data: {
                ...createEventDto,
                participants: {
                    connect: {
                        id: createEventDto.creatorId,
                    },
                },
            },
            include: { participants: { select: { id: true, name: true } } },
        });
    }

    async findAll() {
        return await this.prisma.event.findMany({
            include: { participants: { select: { id: true, name: true } } },
        });
    }

    async findOne(id: string) {
        return await this.prisma.event.findUnique({
            where: { id },
            include: { participants: { select: { id: true, name: true } } },
        });
    }

    async update(id: string, updateEventDto: UpdateEventDto) {
        return await this.prisma.event.update({
            where: { id },
            data: updateEventDto,
            include: { participants: { select: { id: true, name: true } } },
        });
    }

    async remove(id: string) {
        return await this.prisma.event.delete({ where: { id } });
    }

    async joinEvent(eventId: string, userId: string) {
        return await this.prisma.event.update({
            where: { id: eventId },
            data: {
                participants: {
                    connect: { id: userId },
                },
            },
            include: { participants: { select: { id: true, name: true } } },
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
            include: { participants: { select: { id: true, name: true } } },
        });
    }
}
