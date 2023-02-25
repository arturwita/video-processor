import { Logger, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Video, VideoSchema } from "./video.schema";
import { VideoRepository } from "./video.repository";
import { VideoController } from "./video.controller";
import { VideoService } from "./video.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Video.name,
        schema: VideoSchema,
      },
    ]),
  ],
  providers: [VideoController, VideoService, VideoRepository, Logger],
})
export class VideoModule {}
