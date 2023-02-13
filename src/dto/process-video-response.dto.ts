import { ApiProperty } from "@nestjs/swagger";
import { VideoId } from "../shared/types/video-id";

export class ProcessVideoResponseDto {
  @ApiProperty()
  videoId: VideoId;
}
