import { BaseEvent } from "./base.event";
import { EventTopic } from "../event-topic.enum";

type VideoAnalyzedEventPayload = {
  todo: number;
};

export class VideoAnalyzedEvent extends BaseEvent<VideoAnalyzedEventPayload> {
  public readonly topic = EventTopic.VIDEO_ANALYZED;

  constructor(public payload: VideoAnalyzedEventPayload) {
    super();
  }
}
