import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@unifig/nest";
import { Config } from "@unifig/core";
import { RMQModule } from "nestjs-rmq";
import { MongoConfig } from "./config/mongo.config";
import { VideoModule } from "./video/video.module";
import { RabbitConfig } from "./config/rabbit.config";

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
    }),
    VideoModule,
  ],
})
export class AppModule {}
