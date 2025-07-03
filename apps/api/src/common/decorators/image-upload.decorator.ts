import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOkResponse } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { BadRequestException } from "@nestjs/common";
import { UploadBannerResponse } from "src/event/dto/upload-banner-response.dto";

export function ImageUpload(fieldName: string, uploadType) {
    return applyDecorators(
        ApiConsumes("multipart/form-data"),
        ApiBody({
            schema: {
                type: "object",
                properties: {
                    [fieldName]: {
                        type: "string",
                        format: "binary",
                    },
                },
            },
        }),
        UseInterceptors(
            FileInterceptor(fieldName, {
                storage: diskStorage({
                    destination: `./static/uploads/tmp/${uploadType}`,
                    filename: (_, file, cb) => {
                        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                        const fileExt = extname(file.originalname);
                        cb(null, `${uploadType}-${uniqueSuffix}${fileExt}`);
                    },
                }),
                fileFilter: (_req, file, cb) => {
                    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                        return cb(new BadRequestException("Only image files are allowed!"), false);
                    }
                    cb(null, true);
                },
                limits: { fileSize: 5 * 1024 * 1024 },
            }),
        ),
        ApiOkResponse({ description: "Successfully uploaded file", type: UploadBannerResponse }),
    );
}
