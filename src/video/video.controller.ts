import { Injectable } from "@nestjs/common";
import { RMQRoute } from "nestjs-rmq";
import { EventTopic } from "../domain/event-topic.enum";
import {
  GetVideoByIdEventPayload,
  VideoAnalyzedEventPayload,
  VideoProcessedEventPayload,
  VideoProcessingRequestEventPayload,
} from "../domain/events";
import { VideoService } from "./video.service";

@Injectable()
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @RMQRoute(EventTopic.VIDEO_PROCESSING_REQUEST)
  public async createVideo(payload: VideoProcessingRequestEventPayload) {
    const { videoId, url } = payload;

    return this.videoService.create(videoId, url);
  }

  @RMQRoute(EventTopic.VIDEO_ANALYZED)
  public async saveVideoMetadata(payload: VideoAnalyzedEventPayload) {
    return this.videoService.saveMeta(payload);
  }

  @RMQRoute(EventTopic.VIDEO_PROCESSED)
  public async saveProcessingResults({ videoId }: VideoProcessedEventPayload) {
    return this.videoService.saveProcessed(videoId);
  }

  @RMQRoute(EventTopic.GET_VIDEO_BY_ID)
  public async getVideoById({ videoId }: GetVideoByIdEventPayload) {
    const video = await this.videoService.getById(videoId);

    return {
      video,
    };
  }
}
