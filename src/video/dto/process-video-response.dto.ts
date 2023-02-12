import { ApiProperty } from "@nestjs/swagger";
import { VideoId } from "../video.schema";

export class ProcessVideoResponseDto {
  @ApiProperty()
  videoId: VideoId;
}
