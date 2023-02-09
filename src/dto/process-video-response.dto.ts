import { ApiProperty } from "@nestjs/swagger";
import { ProcessingStatus } from "../domain/processing-status.enum";
import { VideoId } from "../shared/utils/generate-video-id";

export class ProcessVideoResponseDto {
  @ApiProperty()
  id: VideoId;

  @ApiProperty()
  status: ProcessingStatus.ANALYZING;
}
