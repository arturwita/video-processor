import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@unifig/nest";
import { ProcessingConfig } from "../config/processing.config";
import { FFmpegModule } from "../ffmpeg/ffmpeg.module";
import { StorageModule } from "../storage/storage.module";
import { ProcessingController } from "./processing.controller";
import { ProcessingService } from "./processing.service";

@Module({
  imports: [
    FFmpegModule,
    StorageModule,
    ConfigModule.forRoot({ default: ProcessingConfig }),
  ],
  controllers: [ProcessingController],
  providers: [ProcessingService, Logger],
})
export class ProcessingModule {}
