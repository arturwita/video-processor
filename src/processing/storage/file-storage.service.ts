import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { InjectConfig } from "@unifig/nest";
import { ConfigContainer } from "@unifig/core";
import { Stream } from "node:stream";
import { writeFile } from "fs/promises";
import { VideoStorage, StorageType } from "./abstract/video-storage";
import { StorageConfig } from "../../config/storage.config";
import { VideoId } from "../../shared/types/video";

@Injectable()
export class FileStorageService extends VideoStorage {
  protected readonly type = StorageType.LOCAL;

  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    @InjectConfig() private readonly config: ConfigContainer<StorageConfig>
  ) {
    super();
  }

  public async save(stream: Stream, videoId: VideoId): Promise<void> {
    const { outputDirectory } = this.config.values;
    const path = `${outputDirectory}/${videoId}`;
    this.logger.log(`Trying to save data under the following path: ${path}`);
    return writeFile(path, stream);
  }

  public supports(type: StorageType): boolean {
    return this.type === type;
  }
}
