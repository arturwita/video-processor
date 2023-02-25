import { Controller } from "@nestjs/common";
import { RMQRoute } from "nestjs-rmq";
import { EventTopic } from "../domain/event-topic.enum";
import { AnalyzeVideoEventPayload } from "../domain/events";
import { AnalyzingService } from "./analyzing.service";

@Controller()
export class AnalyzingController {
  constructor(private readonly analyzingService: AnalyzingService) {}

  @RMQRoute(EventTopic.ANALYZE_VIDEO)
  public async analyzeVideo(payload: AnalyzeVideoEventPayload) {
    return this.analyzingService.analyze(payload);
  }
}
