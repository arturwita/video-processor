import { BaseEvent } from "./base.event";
import { EventTopic } from "../event-topic.enum";
import { VideoId } from "../../shared/types/video";

export type VideoProcessingRequestEventPayload = {
  videoId: VideoId;
  url: string;
};

export class VideoProcessingRequestEvent extends BaseEvent<VideoProcessingRequestEventPayload> {
  public readonly topic = EventTopic.VIDEO_PROCESSING_REQUEST;

  constructor(public payload: VideoProcessingRequestEventPayload) {
    super();
  }
}
