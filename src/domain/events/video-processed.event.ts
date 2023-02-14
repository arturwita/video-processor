import { BaseEvent } from "./base.event";
import { EventTopic } from "../event-topic.enum";
import { VideoId } from "../../shared/types/video";

export type VideoProcessedEventPayload = {
  videoId: VideoId;
};

export class VideoProcessedEvent extends BaseEvent<VideoProcessedEventPayload> {
  public readonly topic = EventTopic.VIDEO_PROCESSED;

  constructor(public payload: VideoProcessedEventPayload) {
    super();
  }
}
