import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOkResponse } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { UploadBannerResponse } from "~/event/dto/upload-banner-response.dto";
import fs from "fs";

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
                    destination: (req, file, cb) => {
                        const uploadPath = `./static/uploads/tmp/${uploadType}`;
                        // Recursively make folders if they don't exist
                        fs.mkdirSync(uploadPath, { recursive: true });
                        cb(null, uploadPath);
                    },
                    filename: (_, file, cb) => {
                        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                        const fileExt = extname(file.originalname);
                        cb(null, `${uploadType}-${uniqueSuffix}${fileExt}`);
                    },
                }),
                limits: { fileSize: 5 * 1024 * 1024 },
            }),
        ),
        ApiOkResponse({ description: "Successfully uploaded file", type: UploadBannerResponse }),
    );
}
