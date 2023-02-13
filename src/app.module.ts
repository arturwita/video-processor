import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@unifig/nest";
import { Config } from "@unifig/core";
import { MongoConfig } from "./config/mongo.config";

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRoot(Config.getValues(MongoConfig).url, {
      useNewUrlParser: true,
      autoIndex: false,
      useUnifiedTopology: true,
    }),
  ],
})
export class AppModule {}
