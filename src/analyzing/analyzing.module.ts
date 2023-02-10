import { Module } from "@nestjs/common";
import { AnalyzingController } from "./analyzing.controller";

@Module({
  controllers: [AnalyzingController],
})
export class AnalyzingModule {}
