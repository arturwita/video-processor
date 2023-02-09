import { ApiProperty } from "@nestjs/swagger";
import { ProcessingStatus } from "../../domain/processing-status.enum";
import { VideoId } from "../video.schema";

export class GetVideoByIdResponseDto {
  @ApiProperty()
  _id: VideoId;

  @ApiProperty()
  status: ProcessingStatus;
}
