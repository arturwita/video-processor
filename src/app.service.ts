import { Injectable } from "@nestjs/common";
import { ProcessVideoBodyDto } from "./dto/process-video-body.dto";
import { generateVideoId, VideoId } from "./shared/utils/generate-video-id";
import { ProcessVideoResponseDto } from "./dto/process-video-response.dto";
import { ProcessingStatus } from "./domain/processing-status.enum";
import { GetVideoByIdResponseDto } from "./dto/get-video-by-id-response.dto";

@Injectable()
export class AppService {
  public async process(
    dto: ProcessVideoBodyDto
  ): Promise<ProcessVideoResponseDto> {
    const id = generateVideoId();

    // TODO: trigger video analyzing

    return { id, status: ProcessingStatus.ANALYZING };
  }

  public async getById(id: VideoId): Promise<GetVideoByIdResponseDto> {
    // TODO: retrieve a video from the database;

    return { id, status: ProcessingStatus.ANALYZING };
  }
}
