import { ApiProperty } from "@nestjs/swagger";
import { ProcessingStatus } from "../../domain/processing-status.enum";
import { VideoId } from "../video.schema";

export class ProcessVideoResponseDto {
  @ApiProperty()
  _id: VideoId;

  @ApiProperty()
  status: ProcessingStatus;
}
