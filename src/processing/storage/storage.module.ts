import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@unifig/nest";
import { StorageConfig } from "../../config/storage.config";
import { FileStorageService } from "./file-storage.service";
import { StorageStrategyService } from "./storage-strategy.service";

@Module({
  imports: [ConfigModule.forRoot({ default: StorageConfig })],
  providers: [FileStorageService, StorageStrategyService, Logger],
  exports: [StorageStrategyService],
})
export class StorageModule {}
