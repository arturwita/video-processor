import * as config from "config";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Config, PlainConfigAdapter } from "@unifig/core";
import { toTable } from "@unifig/validation-presenter-table";
import { MongoConfig } from "./config/mongo.config";
import { AppConfig } from "./config/app.config";
import { RabbitConfig } from "./config/rabbit.config";
import { StorageConfig } from "./config/storage.config";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, version, description } = require("../package.json");

(async function bootstrap() {
  const validationError = await Config.register({
    templates: [AppConfig, MongoConfig, RabbitConfig, StorageConfig],
    adapter: new PlainConfigAdapter(config),
  });
  if (validationError) {
    console.error(toTable(validationError));
    process.exit(1);
  }

  const { AppModule } = await import("./app.module");
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const swaggerFile = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerFile);
  SwaggerModule.setup("docs", app, document);

  const { port } = Config.getValues(AppConfig);

  await app.listen(port);
})();
