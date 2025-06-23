import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class EventService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createEventDto: CreateEventDto) {
        return await this.prisma.event.create({ data: createEventDto });
    }

    async findAll() {
        return await this.prisma.event.findMany();
    }

    async findOne(id: string) {
        return await this.prisma.event.findUnique({ where: { id } })
    }

    update(id: number, updateEventDto: UpdateEventDto) {
        return `This action updates a #${id} event`;
    }

    async remove(id: string) {
        return await this.prisma.event.delete({ where: { id } });
    }
}
