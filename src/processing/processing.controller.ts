import { Controller } from "@nestjs/common";
import { RMQRoute } from "nestjs-rmq";
import { EventTopic } from "../domain/event-topic.enum";
import { ProcessVideoEventPayload } from "../domain/events";
import { ProcessingService } from "./processing.service";

@Controller()
export class ProcessingController {
  constructor(private readonly processingService: ProcessingService) {}

  @RMQRoute(EventTopic.PROCESS_VIDEO)
  public async processVideo(payload: ProcessVideoEventPayload) {
    return this.processingService.process(payload);
  }
}
