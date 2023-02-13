import { Controller } from "@nestjs/common";
import { RMQRoute } from "nestjs-rmq";
import { EventTopic } from "../domain/event-topic.enum";
import { StartVideoAnalyzingEventPayload } from "../domain/events/start-video-analyzing.event";
import { CreateVideoDto, VideoRepository } from "./video.repository";
import { ProcessingStatus } from "../domain/processing-status.enum";
import { GetVideoByIdEventPayload } from "../domain/events/get-video-by-id.event";

@Controller()
export class StoringController {
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

  @RMQRoute(EventTopic.GET_VIDEO_BY_ID)
  public async getVideoById({ videoId }: GetVideoByIdEventPayload) {
    const video = await this.videoRepository.getById(videoId);
    if (!video) {
      return { video: null };
    }

    return { video };
  }
}
