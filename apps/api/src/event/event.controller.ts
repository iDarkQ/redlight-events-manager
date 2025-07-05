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
import { AuthGuard } from "~/auth/auth.guard";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { LeaveEventDto } from "~/event/dto/leave-event.dto";
import { UpdateEventDto } from "~/event/dto/update-event.dto";
import { EventDto } from "~/event/dto/event.dto";
import { CreateEventRequestDto } from "~/event/dto/create-event-request.dto";
import { UploadBannerResponse } from "~/event/dto/upload-banner-response.dto";
import { FileService } from "~/file/file.service";
import { UserService } from "~/user/user.service";
import { MailService } from "~/mail/mail.service";
import { ImageUpload } from "~/common/decorators/image-upload.decorator";

@Controller("event")
export class EventController {
    constructor(
        private readonly eventService: EventService,
        private readonly userService: UserService,
        private readonly fileService: FileService,
        private readonly mailService: MailService,
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: EventDto, description: "Creates and returns new event" })
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
    @ApiOkResponse({ description: "Returns all existing events", type: EventDto, isArray: true })
    async findAll() {
        return await this.eventService.findAll();
    }

    @Get(":id")
    @ApiOkResponse({ type: EventDto, description: "Returns specific event based on id" })
    findOne(@Param("id") id: string) {
        return this.eventService.findOne(id);
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: EventDto, description: "Updates event by id" })
    @ApiNotFoundResponse({ description: "Event does not exist" })
    @ApiForbiddenResponse({ description: "Only admins can edit events from other users" })
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
    @ApiOkResponse({ type: EventDto, description: "User joined selected event" })
    @ApiNotFoundResponse({ description: "Event does not exist" })
    @ApiConflictResponse({ description: "Event is full" })
    @ApiBadRequestResponse({ description: "Already part of event" })
    async join(@Param("id") id: string, @Request() req): Promise<EventDto> {
        const user = req.user;
        const event = await this.eventService.findOne(id);
        if (!event) {
            throw new NotFoundException("Event does not exist");
        }

        if (event.participants.length >= event.maxParticipants) {
            throw new ConflictException("Event is full");
        }

        if (event.participants.some((p) => p.id === user.id)) {
            throw new BadRequestException("Already part of event");
        }

        return await this.eventService.joinEvent(id, user.id);
    }

    @Patch("leave/:id")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: EventDto, description: "User left selected event" })
    @ApiNotFoundResponse({ description: "Event does not exist" })
    @ApiConflictResponse({ description: "Event is already completed" })
    @ApiForbiddenResponse({ description: "Only admins can remove other users from an event" })
    @ApiBadRequestResponse({
        description: "Creator cannot leave its own event or Not part of event",
    })
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
    @ApiBearerAuth()
    @ApiOkResponse({ description: "Successfully deleted event" })
    @ApiNotFoundResponse({ description: "Event does not exist" })
    @ApiUnauthorizedResponse({ description: "You don't own this event" })
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

    @Post("photo")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ImageUpload("photo", "banners")
    @ApiOkResponse({ type: UploadBannerResponse, description: "Upload successful" })
    @ApiBadRequestResponse({ description: "File upload failed" })
    async uploadEventPhoto(
        @UploadedFile() file: Express.Multer.File,
    ): Promise<UploadBannerResponse> {
        if (!file) {
            throw new BadRequestException("File upload failed");
        }
        return { fileUrl: file.path.replace(/\\/g, "/") };
    }
}
