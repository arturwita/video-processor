import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { VideoId } from "../shared/types/video-id";

export class GetVideoByIdParamsDto {
  @IsUUID("4")
  @ApiProperty()
  id: VideoId;
}
