import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { ProcessVideoResponseDto } from "./dto/process-video-response.dto";
import { ProcessVideoBodyDto } from "./dto/process-video-body.dto";
import { GetVideoByIdParamsDto } from "./dto/get-video-by-id-params.dto";
import { GetVideoByIdResponseDto } from "./dto/get-video-by-id-response.dto";
import { GatewayService } from "./gateway.service";

@Controller("videos")
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post("/process")
  @ApiExtraModels(ProcessVideoResponseDto)
  @ApiResponse({ schema: { $ref: getSchemaPath(ProcessVideoResponseDto) } })
  public async initProcessing(@Body() dto: ProcessVideoBodyDto) {
    return this.gatewayService.initProcessing(dto);
  }

  @Get("/:id")
  @ApiExtraModels(GetVideoByIdResponseDto)
  @ApiResponse({ schema: { $ref: getSchemaPath(GetVideoByIdResponseDto) } })
  public async getVideoById(@Param() { id }: GetVideoByIdParamsDto) {
    return this.gatewayService.getById(id);
  }
}
