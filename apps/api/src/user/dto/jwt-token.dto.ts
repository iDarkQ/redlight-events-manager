import { IsString } from "class-validator";

export class JwtTokenDto {
    /**
     * A unique token for user authentication
     * @example "xxxxx.yyyyy.zzzzz"
     */
    @IsString()
    token: string;
}
