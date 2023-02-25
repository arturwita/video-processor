import { Injectable } from "@nestjs/common";
import { FileStorageService } from "./file-storage.service";
import {
  AbstractVideoStorage,
  StorageTarget,
} from "./abstract/abstract-video-storage";

@Injectable()
export class StorageStrategyService {
  private readonly strategies: AbstractVideoStorage[];

  constructor(private readonly fileStorageService: FileStorageService) {
    this.strategies = [fileStorageService];
  }

  public getSupportedStrategy(target: StorageTarget): AbstractVideoStorage {
    const strategy = this.strategies.find((strategy) =>
      strategy.supports(target)
    );

    if (!strategy) {
      throw Error("Unable to find a strategy to save a result video");
    }

    return strategy;
  }
}
