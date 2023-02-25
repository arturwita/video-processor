import { Module } from "@nestjs/common";
import { FFprobeService } from "./ffprobe.service";
import { FFmpegService } from "./ffmpeg.service";

@Module({
  providers: [FFprobeService, FFmpegService],
  exports: [FFprobeService, FFmpegService],
})
export class FFmpegModule {}
