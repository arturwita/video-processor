import { IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ProcessVideoBodyDto {
  @IsUrl()
  @ApiProperty()
  url: string;
}
