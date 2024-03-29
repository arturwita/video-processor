import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import {
  ProcessVideoResponseDto,
  ProcessVideoBodyDto,
  GetVideoByIdParamsDto,
  GetVideoByIdResponseDto,
} from "./dto";
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
