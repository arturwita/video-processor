import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { VideoId } from "../shared/types/video";
import { RMQService } from "nestjs-rmq";
import { ProcessingStatus } from "../domain/processing-status.enum";
import {
  CreateVideoDto,
  UpdateAnalyzedVideoDto,
  UpdateProcessedVideoDto,
  VideoRepository,
} from "./video.repository";
import { Video } from "./video.schema";
import {
  AnalyzeVideoEvent,
  ProcessVideoEvent,
  VideoAnalyzedEventPayload,
} from "../domain/events";

@Injectable()
export class VideoService {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly videoRepository: VideoRepository,
    private readonly rabbitService: RMQService
  ) {}

  public async create(videoId: VideoId, url: string): Promise<Video> {
    const createVideoDto: CreateVideoDto = {
      _id: videoId,
      url,
      status: ProcessingStatus.QUEUED,
    };

    const event = new AnalyzeVideoEvent({ videoId, url });

    this.logger.log(`Emitting ${event.topic} event`);
    await this.rabbitService.notify(event.topic, event.payload);

    return this.videoRepository.save(createVideoDto);
  }

  public async saveMeta(payload: VideoAnalyzedEventPayload): Promise<Video> {
    const { videoId, meta, url } = payload;
    const updateAnalyzedVideoDto: UpdateAnalyzedVideoDto = {
      status: ProcessingStatus.ANALYZED,
      meta,
    };

    const event = new ProcessVideoEvent({ videoId, url, meta });

    this.logger.log(`Emitting ${event.topic} event`);
    await this.rabbitService.notify(event.topic, event.payload);

    return this.videoRepository.update(videoId, updateAnalyzedVideoDto);
  }

  public async saveProcessed(videoId: VideoId): Promise<Video> {
    const updateProcessedVideoDto: UpdateProcessedVideoDto = {
      status: ProcessingStatus.PROCESSED,
    };

    return this.videoRepository.update(videoId, updateProcessedVideoDto);
  }

  public async getById(videoId: VideoId): Promise<Video | null> {
    const video = await this.videoRepository.getById(videoId);
    if (!video) {
      return null;
    }

    return video;
  }
}
