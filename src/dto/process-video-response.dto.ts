import { ApiProperty } from "@nestjs/swagger";
import { VideoId } from "../shared/types/video";

export class ProcessVideoResponseDto {
  @ApiProperty()
  videoId: VideoId;
}
