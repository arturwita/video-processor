import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NotFoundException,
} from "@nestjs/common";
import { RMQService } from "nestjs-rmq";
import { ProcessVideoBodyDto } from "./dto/process-video-body.dto";
import { generateVideoId } from "../shared/utils/generate-video-id";
import { ProcessVideoResponseDto } from "./dto/process-video-response.dto";
import { ProcessingStatus } from "../domain/processing-status.enum";
import { GetVideoByIdResponseDto } from "./dto/get-video-by-id-response.dto";
import { CreateVideoDto, VideoRepository } from "./video.repository";
import { VideoId } from "./video.schema";
import { StartVideoAnalyzingEvent } from "../domain/events/start-video-analyzing.event";

@Injectable()
export class VideoService {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly videoRepository: VideoRepository,
    private readonly rabbitService: RMQService
  ) {}

  public async initProcessing(
    dto: ProcessVideoBodyDto
  ): Promise<ProcessVideoResponseDto> {
    const videoId = generateVideoId();

    const createVideoDto: CreateVideoDto = {
      _id: videoId,
      url: dto.url,
      status: ProcessingStatus.QUEUED,
    };

    await this.videoRepository.save(createVideoDto);

    const event = new StartVideoAnalyzingEvent({ url: dto.url, videoId });
    this.logger.log(`Emitting ${event.topic} event`);

    await this.rabbitService.notify(event.topic, event.payload);

    return { videoId };
  }

  public async getById(videoId: VideoId): Promise<GetVideoByIdResponseDto> {
    const video = await this.videoRepository.getById(videoId);

    if (!video) {
      this.logger.log(`Video with ID: [${videoId}] was not found`);
      throw new NotFoundException("Video with the given ID does not exist");
    }

    return video;
  }
}
