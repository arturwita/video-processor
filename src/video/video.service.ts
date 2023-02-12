import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NotFoundException,
} from "@nestjs/common";
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
    private readonly videoRepository: VideoRepository,
    @Inject(Logger) private readonly logger: LoggerService
  ) {}

  public async process(
    dto: ProcessVideoBodyDto
  ): Promise<ProcessVideoResponseDto> {
    const videoId = generateVideoId();

    const createVideoDto: CreateVideoDto = {
      _id: videoId,
      url: dto.url,
      status: ProcessingStatus.QUEUED,
    };

    await this.videoRepository.save(createVideoDto);

    // TODO: trigger video analyzing
    const event = new StartVideoAnalyzingEvent({ url: dto.url, videoId });
    this.logger.log(`Emitting ${event.topic} event`);

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
