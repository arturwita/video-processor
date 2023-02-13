import { MongooseModule } from "@nestjs/mongoose";
import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@unifig/nest";
import { Config } from "@unifig/core";
import { RMQModule } from "nestjs-rmq";
import { MongoConfig } from "./config/mongo.config";
import { RabbitConfig } from "./config/rabbit.config";
import { AppConfig } from "./config/app.config";
import { AnalyzingModule } from "./analyzing/analyzing.module";
import { StoringModule } from "./storing/storing.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRoot(Config.getValues(MongoConfig).url, {
      useNewUrlParser: true,
      autoIndex: false,
      useUnifiedTopology: true,
    }),
    RMQModule.forRoot({
      exchangeName: Config.getValues(RabbitConfig).exchangeName,
      connections: [
        {
          login: Config.getValues(RabbitConfig).login,
          password: Config.getValues(RabbitConfig).password,
          host: Config.getValues(RabbitConfig).host,
          port: Config.getValues(RabbitConfig).port,
        },
      ],
      queueName: Config.getValues(RabbitConfig).queueName,
      serviceName: Config.getValues(AppConfig).name,
    }),
    AnalyzingModule,
    StoringModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
