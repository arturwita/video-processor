import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Video, VideoSchema } from "./video.schema";
import { VideoRepository } from "./video.repository";
import { StoringController } from "./storing.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Video.name,
        schema: VideoSchema,
      },
    ]),
  ],
  controllers: [StoringController],
  providers: [VideoRepository],
})
export class StoringModule {}
