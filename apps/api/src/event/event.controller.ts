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
import { AuthGuard } from "src/auth/auth.guard";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { LeaveEventDto } from "src/event/dto/leave-event.dto";
import { UpdateEventDto } from "src/event/dto/update-event.dto";
import { EventDto } from "src/event/dto/event.dto";
import { CreateEventRequestDto } from "src/event/dto/create-event-request.dto";

@Controller("event")
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async create(@Body() createEventDto: CreateEventRequestDto, @Request() req): Promise<EventDto> {
        return await this.eventService.create({ ...createEventDto, creatorId: req.user.id });
    }

    @Get()
    async findAll() {
        return await this.eventService.findAll();
    }

    @Get(":id")
    @ApiBearerAuth()
    findOne(@Param("id") id: string) {
        return this.eventService.findOne(id);
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async update(
        @Param("id") id: string,
        @Request() req,
        @Body() updateEventDto: UpdateEventDto,
    ): Promise<EventDto> {
        const user = req.user;
        const event = await this.eventService.findOne(id);
        if (!event) {
            throw new NotFoundException("Event does not exist");
        }

        if (user.role !== "ADMIN" && event.creatorId !== user.id) {
            throw new ForbiddenException("Only admins can edit events from other users");
        }

        return await this.eventService.update(id, updateEventDto);
    }

    @Patch("join/:id")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async join(@Param("id") id: string, @Request() req): Promise<EventDto> {
        const user = req.user;
        const event = await this.eventService.findOne(id);
        if (!event) {
            throw new NotFoundException("Event does not exist");
        }

        if (event.participants.length >= event.maxParticipants) {
            throw new ConflictException("Participant limit reached");
        }

        if (event.participants.some((p) => p.id === user.id)) {
            throw new BadRequestException("Already joined");
        }

        return await this.eventService.joinEvent(id, user.id);
    }

    @Patch("leave/:id")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async leave(
        @Param("id") id: string,
        @Query() query: LeaveEventDto,
        @Request() req,
    ): Promise<EventDto> {
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

        return await this.eventService.leaveEvent(id, userId);
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    @ApiOkResponse({ description: "Successfully deleted record" })
    async remove(@Param("id") id: string, @Request() req) {
        const user = req.user;
        const event = await this.eventService.findOne(id);
        if (!event) {
            throw new NotFoundException("Event does not exist");
        }

        if (user.role !== "ADMIN" && user.id !== event.creatorId) {
            throw new UnauthorizedException("You don't own this event");
        }

        await this.eventService.remove(id);
        return;
    }
}
