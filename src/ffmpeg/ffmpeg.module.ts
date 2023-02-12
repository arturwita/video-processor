import { Module } from "@nestjs/common";
import { FFprobeService } from "./ffprobe.service";

@Module({
  providers: [FFprobeService],
  exports: [FFprobeService],
})
export class FFmpegModule {}
