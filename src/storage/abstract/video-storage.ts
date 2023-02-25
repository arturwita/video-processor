import { Stream } from "node:stream";
import { VideoId } from "../../shared/types/video";

export enum StorageType {
  LOCAL = "local",
}

export abstract class VideoStorage {
  protected abstract readonly type: StorageType;

  public abstract save(data: string | Stream, videoId: VideoId): Promise<void>;
  public abstract supports(type: StorageType): boolean;
}
