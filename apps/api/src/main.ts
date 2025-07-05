import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import metadata from "./metadata";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AllExceptionsFilter } from "~/utils/all-exceptions-filter";
import { join } from "path";

const bootstrap = async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        rawBody: true,
    });

    const uploadDir = join(__dirname, "..", "static");

    app.useStaticAssets(uploadDir, { prefix: "/static" });

    const config = new DocumentBuilder()
        .setTitle("Redlight Events Manager")
        .setDescription("The API used for handling sport events at redlight")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);

    await SwaggerModule.loadPluginMetadata(metadata);
    SwaggerModule.setup("documentation", app, documentFactory, {
        jsonDocumentUrl: "documentation/json",
        swaggerOptions: {
            useInlineDefinitionsForEnums: true,
        },
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    app.useGlobalFilters(new AllExceptionsFilter());
    app.enableCors();

    await app.listen(process.env.PORT ?? 8084);
};

bootstrap();
