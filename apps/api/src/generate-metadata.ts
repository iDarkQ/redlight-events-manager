#!/usr/bin/env ts-node

import { PluginMetadataGenerator } from "@nestjs/cli/lib/compiler/plugins/plugin-metadata-generator";
import { ReadonlyVisitor } from "@nestjs/swagger/dist/plugin";

const generator = new PluginMetadataGenerator();
generator.generate({
    visitors: [
        new ReadonlyVisitor({
            introspectComments: true,
            pathToSource: __dirname,
        }),
    ],
    outputDir: __dirname,
    tsconfigPath: "tsconfig.json",
    watch: false,
});
