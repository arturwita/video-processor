import { ApiProperty } from "@nestjs/swagger";
import { ProcessingStatus } from "../../domain/processing-status.enum";
import { VideoId } from "../../shared/types/video";
import { VideoMetadataDto } from "./video-metadata.dto";

export class GetVideoByIdResponseDto {
  @ApiProperty()
  _id: VideoId;

  @ApiProperty()
  url: string;

  @ApiProperty({ enum: ProcessingStatus })
  status: ProcessingStatus;

  @ApiProperty()
  meta: VideoMetadataDto;

  @ApiProperty()
  __v: number;
}
