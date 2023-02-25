import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { InjectConfig } from "@unifig/nest";
import { ConfigContainer } from "@unifig/core";
import { RMQService } from "nestjs-rmq";
import { FFmpegService } from "../ffmpeg/ffmpeg.service";
import { ProcessingConfig } from "../config/processing.config";
import { StorageStrategyService } from "../storage/storage-strategy.service";
import {
  VideoProcessedEvent,
  ProcessVideoEventPayload,
} from "../domain/events";

@Injectable()
export class ProcessingService {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    @InjectConfig() private readonly config: ConfigContainer<ProcessingConfig>,
    private readonly ffmpegService: FFmpegService,
    private readonly rabbitService: RMQService,
    private readonly storageStrategyService: StorageStrategyService
  ) {}

  public async process(payload: ProcessVideoEventPayload) {
    try {
      const { videoId, url, meta } = payload;
      const { values: config } = this.config;

      const video = await this.ffmpegService.transform(url, meta, config);
      const strategy = this.storageStrategyService.getSupportedStrategy();

      await strategy.save(video, videoId);

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
