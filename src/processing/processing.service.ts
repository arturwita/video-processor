import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { InjectConfig } from "@unifig/nest";
import { ConfigContainer } from "@unifig/core";
import { RMQService } from "nestjs-rmq";
import { VideoAnalyzedEventPayload } from "../domain/events/video-analyzed.event";
import { VideoProcessedEvent } from "../domain/events/video-processed.event";
import { FFmpegService } from "../ffmpeg/ffmpeg.service";
import { StorageConfig } from "../config/storage.config";
import { StorageStrategyService } from "../storage/storage-strategy.service";

@Injectable()
export class ProcessingService {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    @InjectConfig() private readonly config: ConfigContainer<StorageConfig>,
    private readonly ffmpegService: FFmpegService,
    private readonly rabbitService: RMQService,
    private readonly storageStrategyService: StorageStrategyService
  ) {}

  public async process(payload: VideoAnalyzedEventPayload) {
    try {
      const { outputDirectory, target, extension } = this.config.values;
      const { videoId, url, meta } = payload;

      const video = await this.ffmpegService.transform(url, meta, extension);
      const strategy = this.storageStrategyService.getSupportedStrategy(target);

      const path = `${outputDirectory}/${videoId}.${extension}`;
      await strategy.save(video, path);

      const event = new VideoProcessedEvent({
        videoId,
      });

      this.logger.log(`Emitting ${event.topic} event`);
      await this.rabbitService.notify(event.topic, event.payload);

      return event;
    } catch (error) {
      this.logger.error("Failed to process video", error);
      // todo: send to DLQ
    }
  }
}
