import { Controller } from "@nestjs/common";
import { RMQRoute } from "nestjs-rmq";
import { EventTopic } from "../domain/event-topic.enum";
import { VideoAnalyzedEventPayload } from "../domain/events/video-analyzed.event";
import { ProcessingService } from "./processing.service";

@Controller()
export class ProcessingController {
  constructor(private readonly processingService: ProcessingService) {}

  @RMQRoute(EventTopic.VIDEO_ANALYZED)
  public async processVideo(payload: VideoAnalyzedEventPayload) {
    return this.processingService.process(payload);
  }
}
