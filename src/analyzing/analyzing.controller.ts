import { Controller } from "@nestjs/common";
import { RMQRoute } from "nestjs-rmq";
import { EventTopic } from "../domain/event-topic.enum";
import { StartVideoAnalyzingEventPayload } from "../domain/events/start-video-analyzing.event";
import { AnalyzingService } from "./analyzing.service";

@Controller()
export class AnalyzingController {
  constructor(private readonly analyzingService: AnalyzingService) {}

  @RMQRoute(EventTopic.START_VIDEO_ANALYZING)
  public async analyzeVideo(payload: StartVideoAnalyzingEventPayload) {
    return this.analyzingService.analyze(payload);
  }
}
