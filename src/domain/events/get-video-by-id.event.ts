import { BaseEvent } from "./base.event";
import { EventTopic } from "../event-topic.enum";
import { VideoId } from "../../shared/types/video";

export type GetVideoByIdEventPayload = {
  videoId: VideoId;
};

export class GetVideoByIdEvent extends BaseEvent<GetVideoByIdEventPayload> {
  public readonly topic = EventTopic.GET_VIDEO_BY_ID;

  constructor(public payload: GetVideoByIdEventPayload) {
    super();
  }
}
