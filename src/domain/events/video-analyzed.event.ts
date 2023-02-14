import { BaseEvent } from "./base.event";
import { EventTopic } from "../event-topic.enum";
import { VideoId, VideoMetadata } from "../../shared/types/video";

export type VideoAnalyzedEventPayload = {
  videoId: VideoId;
  url: string;
  meta: VideoMetadata;
};

export class VideoAnalyzedEvent extends BaseEvent<VideoAnalyzedEventPayload> {
  public readonly topic = EventTopic.VIDEO_ANALYZED;

  constructor(public payload: VideoAnalyzedEventPayload) {
    super();
  }
}
