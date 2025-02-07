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
    UploadedFile,
} from "@nestjs/common";
import { EventService } from "./event.service";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { LeaveEventDto } from "src/event/dto/leave-event.dto";
import { UpdateEventDto } from "src/event/dto/update-event.dto";
import { EventDto } from "src/event/dto/event.dto";
import { CreateEventRequestDto } from "src/event/dto/create-event-request.dto";
import { UploadBannerResponse } from "src/event/dto/upload-banner-response.dto";
import { FileService } from "src/file/file.service";
import { UserService } from "src/user/user.service";
import { MailService } from "src/mail/mail.service";
import { ImageUpload } from "src/common/decorators/image-upload.decorator";

@Controller("event")
export class EventController {
    constructor(
        private readonly eventService: EventService,
        private readonly userService: UserService,
        private readonly fileService: FileService,
        private readonly mailService: MailService,
    ) { }

    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async create(@Body() createEventDto: CreateEventRequestDto, @Request() req): Promise<EventDto> {
        if (createEventDto.banner) {
            const permanentPath = await this.fileService.moveTempToPermanent(
                "banners",
                createEventDto.banner,
            );
            createEventDto.banner = permanentPath;
        }

        const event = await this.eventService.create({ ...createEventDto, creatorId: req.user.id });
        const users = await this.userService.fetchAll();

        await this.mailService.createEventEmail(users, event);
        return event;
    }

    @Get()
    @ApiOkResponse({ description: "Returns all events", type: EventDto, isArray: true })
    async findAll() {
        return await this.eventService.findAll();
    }

    @Get(":id")
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

        if (event.banner && event.banner !== updateEventDto.banner) {
            await this.fileService.deletePermanentFile("banners", event.banner);
        }

        if (updateEventDto.banner) {
            const permanentPath = await this.fileService.moveTempToPermanent(
                "banners",
                updateEventDto.banner,
            );
            updateEventDto.banner = permanentPath;
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

        if (event.status !== "PLANNED") {
            throw new ConflictException("Event is already completed");
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
        if (!event || event.deleted) {
            throw new NotFoundException("Event does not exist");
        }

        if (user.role !== "ADMIN" && user.id !== event.creatorId) {
            throw new UnauthorizedException("You don't own this event");
        }

        await this.eventService.remove(id);
        return;
    }
}
