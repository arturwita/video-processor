import { BaseEvent } from "./base.event";
import { EventTopic } from "../event-topic.enum";
import { VideoId } from "../../video/video.schema";

export type StartVideoAnalyzingEventPayload = {
  videoId: VideoId;
  url: string;
};

export class StartVideoAnalyzingEvent extends BaseEvent<StartVideoAnalyzingEventPayload> {
  public readonly topic = EventTopic.START_VIDEO_ANALYZING;

  constructor(public payload: StartVideoAnalyzingEventPayload) {
    super();
  }
}
