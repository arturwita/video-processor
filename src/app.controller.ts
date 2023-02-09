import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { ProcessVideoResponseDto } from "./dto/process-video-response.dto";
import { ProcessVideoBodyDto } from "./dto/process-video-body.dto";
import { AppService } from "./app.service";
import { GetVideoByIdParamsDto } from "./dto/get-video-by-id-params.dto";
import { GetVideoByIdResponseDto } from "./dto/get-video-by-id-response.dto";

@Controller("videos")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/process")
  @ApiExtraModels(ProcessVideoResponseDto)
  @ApiResponse({ schema: { $ref: getSchemaPath(ProcessVideoResponseDto) } })
  public async processVideo(@Body() dto: ProcessVideoBodyDto) {
    return this.appService.process(dto);
  }

  @Get("/:id")
  @ApiExtraModels(GetVideoByIdResponseDto)
  @ApiResponse({ schema: { $ref: getSchemaPath(GetVideoByIdResponseDto) } })
  public async getVideoById(@Param() { id }: GetVideoByIdParamsDto) {
    return this.appService.getById(id);
  }
}
