import { Logger, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Video, VideoSchema } from "./video.schema";
import { VideoRepository } from "./video.repository";
import { VideoService } from "./video.service";
import { VideoController } from "./video.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Video.name,
        schema: VideoSchema,
      },
    ]),
  ],
  controllers: [VideoController],
  providers: [VideoService, VideoRepository, Logger],
  exports: [VideoService, VideoRepository],
})
export class VideoModule {}
