import { Stream } from "node:stream";

export enum StorageTarget {
  LOCAL = "local",
}

export abstract class AbstractVideoStorage {
  protected abstract readonly target: StorageTarget;

  public abstract save(data: string | Stream, path: string): Promise<void>;
  public abstract supports(target: StorageTarget): boolean;
}
