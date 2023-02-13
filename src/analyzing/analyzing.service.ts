import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { RMQService } from "nestjs-rmq";
import { StartVideoAnalyzingEventPayload } from "../domain/events/start-video-analyzing.event";
import { VideoAnalyzedEvent } from "../domain/events/video-analyzed.event";
import { FFprobeService } from "../ffmpeg/ffprobe.service";

@Injectable()
export class AnalyzingService {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly ffprobeService: FFprobeService,
    private readonly rabbitService: RMQService
  ) {}

  public async analyze(payload: StartVideoAnalyzingEventPayload) {
    try {
      const meta = await this.ffprobeService.getVideoMeta(payload.url);
      const [videoStreamMeta] = meta.streams;

      const event = new VideoAnalyzedEvent({
        codec: videoStreamMeta.codec_name,
        avgFramerate: videoStreamMeta.avg_frame_rate,
        rFramerate: videoStreamMeta.r_frame_rate,
        height: videoStreamMeta.height,
        width: videoStreamMeta.width,
        colorSpace: videoStreamMeta.color_space,
        colorPrimaries: videoStreamMeta.color_primaries,
      });

      this.logger.log(`Emitting ${event.topic} event`);
      await this.rabbitService.notify(event.topic, event.payload);

      return meta;
    } catch (error) {
      this.logger.error("Failed to extract video metadata", error);
      // todo: send to DLQ
    }
  }
}
