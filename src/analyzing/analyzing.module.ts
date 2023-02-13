import { Logger, Module } from "@nestjs/common";
import { AnalyzingController } from "./analyzing.controller";
import { FFmpegModule } from "../ffmpeg/ffmpeg.module";
import { AnalyzingService } from "./analyzing.service";

@Module({
  imports: [FFmpegModule],
  controllers: [AnalyzingController],
  providers: [AnalyzingService, Logger],
})
export class AnalyzingModule {}
