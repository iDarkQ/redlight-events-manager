import { IsString } from "class-validator";

export class UploadBannerResponse {
    @IsString()
    fileUrl?: string;
}
