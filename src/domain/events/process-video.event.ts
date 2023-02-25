import { BaseEvent } from "./base.event";
import { EventTopic } from "../event-topic.enum";
import { VideoId, VideoMetadata } from "../../shared/types/video";

export type ProcessVideoEventPayload = {
  videoId: VideoId;
  url: string;
  meta: VideoMetadata;
};

export class ProcessVideoEvent extends BaseEvent<ProcessVideoEventPayload> {
  public readonly topic = EventTopic.PROCESS_VIDEO;

  constructor(public payload: ProcessVideoEventPayload) {
    super();
  }
}
