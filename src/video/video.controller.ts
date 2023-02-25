import { Injectable } from "@nestjs/common";
import { RMQRoute } from "nestjs-rmq";
import { EventTopic } from "../domain/event-topic.enum";
import { ProcessingStatus } from "../domain/processing-status.enum";
import { StartVideoAnalyzingEventPayload } from "../domain/events/start-video-analyzing.event";
import { GetVideoByIdEventPayload } from "../domain/events/get-video-by-id.event";
import { VideoAnalyzedEventPayload } from "../domain/events/video-analyzed.event";
import { VideoProcessedEventPayload } from "../domain/events/video-processed.event";
import { CreateVideoDto, VideoRepository } from "./video.repository";
import { Video } from "./video.schema";

@Injectable()
export class VideoController {
  constructor(private readonly videoRepository: VideoRepository) {}

  @RMQRoute(EventTopic.START_VIDEO_ANALYZING)
  public async saveVideo(payload: StartVideoAnalyzingEventPayload) {
    const createVideoDto: CreateVideoDto = {
      _id: payload.videoId,
      url: payload.url,
      status: ProcessingStatus.QUEUED,
    };

    return this.videoRepository.save(createVideoDto);
  }

  @RMQRoute(EventTopic.VIDEO_ANALYZED)
  public async saveVideoMetadata(payload: VideoAnalyzedEventPayload) {
    const { videoId, meta } = payload;
    const saveMetaProperties: Partial<Video> = {
      status: ProcessingStatus.ANALYZED,
      meta,
    };

    return this.videoRepository.update(videoId, saveMetaProperties);
  }

  @RMQRoute(EventTopic.VIDEO_PROCESSED)
  public async saveProcessingResults(payload: VideoProcessedEventPayload) {
    const { videoId } = payload;
    const processingResultProperties: Partial<Video> = {
      status: ProcessingStatus.PROCESSED,
    };

    return this.videoRepository.update(videoId, processingResultProperties);
  }

  @RMQRoute(EventTopic.GET_VIDEO_BY_ID)
  public async getVideoById({ videoId }: GetVideoByIdEventPayload) {
    const video = await this.videoRepository.getById(videoId);
    if (!video) {
      return { video: null };
    }

    return { video };
  }
}
