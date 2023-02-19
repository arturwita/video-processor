import { Logger, Module } from "@nestjs/common";
import { FileStorageService } from "./file-storage.service";
import { StorageStrategyService } from "./storage-strategy.service";

@Module({
  providers: [FileStorageService, StorageStrategyService, Logger],
  exports: [StorageStrategyService],
})
export class StorageModule {}
