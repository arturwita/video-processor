import { BaseEvent } from "./base.event";
import { EventTopic } from "../event-topic.enum";

type VideoAnalyzedEventPayload = {
  codec: string;
  width: number;
  height: number;
  rFramerate: string; // the lowest framerate with which all timestamps can be represented accurately
  avgFramerate: string;
  colorSpace: string;
  colorPrimaries: string;
};

export class VideoAnalyzedEvent extends BaseEvent<VideoAnalyzedEventPayload> {
  public readonly topic = EventTopic.VIDEO_ANALYZED;

  constructor(public payload: VideoAnalyzedEventPayload) {
    super();
  }
}
