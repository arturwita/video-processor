import { BaseEvent } from "./base.event";
import { EventTopic } from "../event-topic.enum";

type VideoProcessedEventPayload = {
  todo: number;
};

export class VideoProcessedEvent extends BaseEvent<VideoProcessedEventPayload> {
  public readonly topic = EventTopic.VIDEO_PROCESSED;

  constructor(public payload: VideoProcessedEventPayload) {
    super();
  }
}
