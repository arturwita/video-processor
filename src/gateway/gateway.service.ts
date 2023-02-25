import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NotFoundException,
} from "@nestjs/common";
import { RMQService } from "nestjs-rmq";
import { StartVideoAnalyzingEvent } from "../domain/events/start-video-analyzing.event";
import {
  GetVideoByIdEvent,
  GetVideoByIdEventPayload,
} from "../domain/events/get-video-by-id.event";
import { ProcessVideoBodyDto } from "./dto/process-video-body.dto";
import { GetVideoByIdResponseDto } from "./dto/get-video-by-id-response.dto";
import { ProcessVideoResponseDto } from "./dto/process-video-response.dto";
import { generateVideoId } from "../shared/utils/generate-video-id";
import { VideoId } from "../shared/types/video";

@Injectable()
export class GatewayService {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly rabbitService: RMQService
  ) {}

  public async initProcessing(
    dto: ProcessVideoBodyDto
  ): Promise<ProcessVideoResponseDto> {
    const videoId = generateVideoId();

    const event = new StartVideoAnalyzingEvent({ url: dto.url, videoId });
    this.logger.log(`Emitting ${event.topic} event`);

    await this.rabbitService.notify(event.topic, event.payload);

    return { videoId };
  }

  public async getById(videoId: VideoId): Promise<GetVideoByIdResponseDto> {
    const event = new GetVideoByIdEvent({ videoId });
    const { video } = await this.rabbitService.send<
      GetVideoByIdEventPayload,
      { video: GetVideoByIdResponseDto | null }
    >(event.topic, event.payload);

    if (!video) {
      this.logger.log(`Video with ID: [${videoId}] was not found`);
      throw new NotFoundException("Video with the given ID does not exist");
    }

    return video;
  }
}
