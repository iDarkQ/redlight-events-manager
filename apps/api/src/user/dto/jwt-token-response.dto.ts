import { IsString } from "class-validator";

export class JwtTokenResponse {
    @IsString()
    token: string;
}
