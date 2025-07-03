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
import { LoginUserDto } from "src/user/dto/login-user.dto";
import { AuthorizeUserDto } from "src/user/dto/authorization-user.dto";
import {
    ApiBearerAuth,
    ApiConflictResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { JwtTokenResponse } from "src/user/dto/jwt-token-response.dto";
import { UserDto } from "src/user/dto/user.dto";
import { UpdateProfileDto } from "src/user/dto/update-profile.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { UploadBannerResponse } from "src/event/dto/upload-banner-response.dto";
import { ImageUpload } from "src/common/decorators/image-upload.decorator";
import { FileService } from "src/file/file.service";

@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly fileService: FileService,
    ) { }

    @Post("signUp")
    @ApiOkResponse({ type: JwtTokenResponse, description: "JWT Token" })
    @ApiConflictResponse({ description: "User already exists" })
    async signUp(@Body() createUserDto: CreateUserDto): Promise<JwtTokenResponse | null> {
        return await this.userService.signUp(createUserDto);
    }

    @Post("signIn")
    @ApiOkResponse({ type: JwtTokenResponse, description: "JWT Token" })
    @ApiUnauthorizedResponse({ description: "Wrong Password" })
    @ApiNotFoundResponse({ description: "User with this email does not exist" })
    async signIn(@Body() loginUserDto: LoginUserDto): Promise<JwtTokenResponse | null> {
        return await this.userService.signIn(loginUserDto);
    }

    @Post("auth")
    @ApiOkResponse({ type: UserDto, description: "Returns user object" })
    @ApiNotFoundResponse({ description: "User does not exists" })
    @ApiUnauthorizedResponse({ description: "Could not authorize your session" })
    async authorize(@Body() authorizeUserDto: AuthorizeUserDto) {
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
    async uploadProfilePhoto(
        @UploadedFile() file: Express.Multer.File,
    ): Promise<UploadBannerResponse> {
        if (!file) {
            throw new BadRequestException("File upload failed");
        }
        return { fileUrl: file.path.replace(/\\/g, "/") };
    }
}
