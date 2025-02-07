import { Module } from "@nestjs/common";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { EventModule } from "./event/event.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
    imports: [
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: 60000,
                    limit: 30,
                },
            ],
        }),
        ScheduleModule.forRoot(),
        UserModule,
        ConfigModule.forRoot(),
        EventModule,
    ],
    providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
