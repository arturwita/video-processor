import { Logger, Module } from "@nestjs/common";
import { GatewayController } from "./gateway.controller";
import { GatewayService } from "./gateway.service";

@Module({
  controllers: [GatewayController],
  providers: [GatewayService, Logger],
})
export class GatewayModule {}
