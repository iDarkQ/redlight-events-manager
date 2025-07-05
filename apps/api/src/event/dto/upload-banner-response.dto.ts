import { IsString } from "class-validator";

export class UploadBannerResponse {
    /**
     * A link for event banner
     * @example "/static/uploads/permanent/event-123-123.png"
     */
    @IsString()
    fileUrl?: string;
}
