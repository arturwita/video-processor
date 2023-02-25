import { BaseEvent } from "./base.event";
import { EventTopic } from "../event-topic.enum";
import { VideoId } from "../../shared/types/video";

export type AnalyzeVideoEventPayload = {
  videoId: VideoId;
  url: string;
};

export class AnalyzeVideoEvent extends BaseEvent<AnalyzeVideoEventPayload> {
  public readonly topic = EventTopic.ANALYZE_VIDEO;

  constructor(public payload: AnalyzeVideoEventPayload) {
    super();
  }
}
