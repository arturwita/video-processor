import { Injectable } from "@nestjs/common";
import { InjectConfig } from "@unifig/nest";
import { ConfigContainer } from "@unifig/core";
import { StorageConfig } from "../config/storage.config";
import { FileStorageService } from "./file-storage.service";
import { VideoStorage } from "./abstract/video-storage";

@Injectable()
export class StorageStrategyService {
  private readonly strategies: VideoStorage[];

  constructor(
    @InjectConfig() private readonly config: ConfigContainer<StorageConfig>,
    private readonly fileStorageService: FileStorageService
  ) {
    this.strategies = [fileStorageService];
  }

  public getSupportedStrategy(): VideoStorage {
    const { storageType } = this.config.values;
    const strategy = this.strategies.find((strategy) =>
      strategy.supports(storageType)
    );

    if (!strategy) {
      throw Error("Unable to find a strategy to save a result video");
    }

    return strategy;
  }
}
