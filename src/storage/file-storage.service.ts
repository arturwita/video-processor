import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { writeFile } from "fs/promises";
import {
  AbstractVideoStorage,
  StorageTarget,
} from "./abstract/abstract-video-storage";

@Injectable()
export class FileStorageService extends AbstractVideoStorage {
  protected readonly target = StorageTarget.LOCAL;

  constructor(@Inject(Logger) private readonly logger: LoggerService) {
    super();
  }

  // todo: typing
  public async save(stream: string, path: string): Promise<void> {
    this.logger.log(`Trying to save data under the following path: ${path}`);
    return writeFile(path, stream);
  }

  public supports(target: StorageTarget): boolean {
    return this.target === target;
  }
}
