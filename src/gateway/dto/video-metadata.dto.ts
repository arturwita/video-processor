import { VideoMetadata } from "../../shared/types/video";
import { ApiProperty } from "@nestjs/swagger";

export class VideoMetadataDto implements VideoMetadata {
  @ApiProperty()
  avgFramerate: string;

  @ApiProperty()
  codec: string;

  @ApiProperty()
  colorPrimaries: string;

  @ApiProperty()
  colorSpace: string;

  @ApiProperty()
  rFramerate: string;

  @ApiProperty()
  height: number;

  @ApiProperty()
  width: number;
}
