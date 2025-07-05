import {
    Controller,
    Post,
    Body,
    Patch,
    UseGuards,
    Request,
    BadRequestException,
    UploadedFile,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "~/user/dto/login-user.dto";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { UserDto } from "~/user/dto/user.dto";
import { UpdateProfileDto } from "~/user/dto/update-profile.dto";
import { AuthGuard } from "~/auth/auth.guard";
import { UploadBannerResponse } from "~/event/dto/upload-banner-response.dto";
import { ImageUpload } from "~/common/decorators/image-upload.decorator";
import { FileService } from "~/file/file.service";
import { JwtTokenDto } from "~/user/dto/jwt-token.dto";

@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly fileService: FileService,
    ) {}

    @Post("signUp")
    @ApiCreatedResponse({ type: JwtTokenDto, description: "JWT Token" })
    @ApiConflictResponse({
        description: "User with this email, username, or credentials already exists",
    })
    async signUp(@Body() createUserDto: CreateUserDto): Promise<JwtTokenDto> {
        return await this.userService.signUp(createUserDto);
    }

    @Post("signIn")
    @ApiOkResponse({ type: JwtTokenDto, description: "JWT Token" })
    @ApiUnauthorizedResponse({ description: "Provided password was wrong" })
    @ApiNotFoundResponse({ description: "User with this email does not exist" })
    async signIn(@Body() loginUserDto: LoginUserDto): Promise<JwtTokenDto | null> {
        return await this.userService.signIn(loginUserDto);
    }

    @Post("auth")
    @ApiOkResponse({ type: UserDto, description: "Returns user object" })
    @ApiNotFoundResponse({ description: "This user does not exists" })
    async authorize(@Body() authorizeUserDto: JwtTokenDto) {
        return await this.userService.authorize(authorizeUserDto);
    }

    @Patch("profile")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: UserDto, description: "Returns user object" })
    async update(@Body() updateProfileDto: UpdateProfileDto, @Request() req) {
        if (updateProfileDto.profile) {
            const permanentPath = await this.fileService.moveTempToPermanent(
                "profiles",
                updateProfileDto.profile,
            );
            updateProfileDto.profile = permanentPath;
        }

        return await this.userService.update(req.user.id, updateProfileDto);
    }

    @Post("profile/picture")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ImageUpload("photo", "profiles")
    @ApiOkResponse({ type: UploadBannerResponse, description: "Upload successful" })
    @ApiBadRequestResponse({ description: "File upload failed" })
    async uploadProfilePhoto(
        @UploadedFile() file: Express.Multer.File,
    ): Promise<UploadBannerResponse> {
        if (!file) {
            throw new BadRequestException("File upload failed");
        }
        return { fileUrl: file.path.replace(/\\/g, "/") };
    }
}
