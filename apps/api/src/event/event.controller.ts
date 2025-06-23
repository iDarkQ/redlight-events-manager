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
    Logger,
    NotFoundException,
} from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventRequestDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiOkResponse } from "@nestjs/swagger";

@Controller("event")
export class EventController {
    constructor(private readonly eventService: EventService) { }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() createEventDto: CreateEventRequestDto, @Request() req) {
        Logger.debug(req.user);
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

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateEventDto: UpdateEventDto) {
        return this.eventService.update(+id, updateEventDto);
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
