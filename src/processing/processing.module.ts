import { Logger, Module } from "@nestjs/common";
import { ProcessingController } from "./processing.controller";
import { FFmpegModule } from "../ffmpeg/ffmpeg.module";
import { ProcessingService } from "./processing.service";

@Module({
  imports: [FFmpegModule],
  controllers: [ProcessingController],
  providers: [ProcessingService, Logger],
})
export class ProcessingModule {}
