import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class EventService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createEventDto: CreateEventDto) {
        return await this.prisma.event.create({
            data: createEventDto,
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
        return await this.prisma.event.update({ where: { id }, data: updateEventDto });
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
