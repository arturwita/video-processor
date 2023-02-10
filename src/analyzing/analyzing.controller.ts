import { Controller } from "@nestjs/common";
import { RMQRoute } from "nestjs-rmq";
import { EventTopic } from "../domain/event-topic.enum";
import { StartVideoAnalyzingEventPayload } from "../domain/events/start-video-analyzing.event";

@Controller()
export class AnalyzingController {
  @RMQRoute(EventTopic.START_VIDEO_ANALYZING)
  public async analyzeVideo(payload: StartVideoAnalyzingEventPayload) {
    console.log("hello", payload);
  }
}
