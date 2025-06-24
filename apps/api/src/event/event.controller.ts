import {
    Request,
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    NotFoundException,
    UnauthorizedException,
    BadRequestException,
    ConflictException,
    Query,
    ForbiddenException,
    Put,
} from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventRequestDto } from "./dto/create-event.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiOkResponse } from "@nestjs/swagger";
import { LeaveEventDto } from "src/event/dto/leave-event.dto";
import { UpdateEventDto } from "src/event/dto/update-event.dto";

@Controller("event")
export class EventController {
    constructor(private readonly eventService: EventService) { }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() createEventDto: CreateEventRequestDto, @Request() req) {
        return await this.eventService.create({ ...createEventDto, creatorId: req.user.id });
    }

    @Get()
    async findAll() {
        return await this.eventService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.eventService.findOne(id);
    }

    @Put(":id")
    async update(@Param("id") id: string, @Request() req, @Body() updateEventDto: UpdateEventDto) {
        const user = req.user;
        const event = await this.eventService.findOne(id);
        if (!event) {
            throw new NotFoundException("Event does not exist");
        }

        if (user.role !== "ADMIN") {
            throw new ForbiddenException("Only admins can edit events from other users");
        }

        await this.eventService.update(id, updateEventDto);
    }

    @Patch("join/:id")
    @UseGuards(AuthGuard)
    async join(@Param("id") id: string, @Request() req) {
        const user = req.user;
        const event = await this.eventService.findOne(id);
        if (!event) {
            throw new NotFoundException("Event does not exist");
        }

        if (event.maxParticipants >= event.participants.length) {
            throw new ConflictException("Participant limit reached");
        }

        if (event.participants.some((p) => p.id === user.id)) {
            throw new BadRequestException("Already joined");
        }

        await this.eventService.joinEvent(id, user.id);
    }

    @Patch("leave/:id")
    @UseGuards(AuthGuard)
    async leave(@Param("id") id: string, @Query() query: LeaveEventDto, @Request() req) {
        const user = req.user;
        const event = await this.eventService.findOne(id);
        if (!event) {
            throw new NotFoundException("Event does not exist");
        }

        if (query.userId && user.role !== "ADMIN") {
            throw new ForbiddenException("Only admins can remove other users from an event");
        }

        const userId = query.userId ? query.userId : user.id;

        if (event.creatorId == userId) {
            throw new BadRequestException("Creator cannot leave its own event");
        }

        if (!event.participants.some((p) => p.id === userId)) {
            throw new BadRequestException("Not part of event");
        }

        await this.eventService.leaveEvent(id, userId);
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    @ApiOkResponse({ description: "Successfully deleted record" })
    async remove(@Param("id") id: string) {
        const event = await this.eventService.findOne(id);
        if (!event) {
            throw new NotFoundException("Event does not exist");
        }

        await this.eventService.remove(id);
        return;
    }
}
