import { ApiProperty } from "@nestjs/swagger";
import { ProcessingStatus } from "../domain/processing-status.enum";
import { VideoId } from "../shared/types/video-id";

export class GetVideoByIdResponseDto {
  @ApiProperty()
  _id: VideoId;

  @ApiProperty({ enum: ProcessingStatus })
  status: ProcessingStatus;
}
