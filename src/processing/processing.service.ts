import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { RMQService } from "nestjs-rmq";
import { VideoAnalyzedEventPayload } from "../domain/events/video-analyzed.event";
import { VideoProcessedEvent } from "../domain/events/video-processed.event";
import { FFmpegService } from "../ffmpeg/ffmpeg.service";

@Injectable()
export class ProcessingService {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly ffmpegService: FFmpegService,
    private readonly rabbitService: RMQService
  ) {}

  public async process(payload: VideoAnalyzedEventPayload) {
    try {
      await this.ffmpegService.todo();

      const event = new VideoProcessedEvent({
        videoId: payload.videoId,
      });

      this.logger.log(`Emitting ${event.topic} event`);
      await this.rabbitService.notify(event.topic, event.payload);

      return "todo";
    } catch (error) {
      this.logger.error("Failed to process video", error);
      // todo: send to DLQ
    }
  }
}
