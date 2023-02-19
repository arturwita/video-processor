import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { From } from "@unifig/core";
import { StorageTarget } from "../storage/abstract/abstract-video-storage";

export class StorageConfig {
  @IsString()
  @IsNotEmpty()
  @From("storage.destination")
  readonly outputDirectory: string;

  @IsEnum(StorageTarget)
  @From("storage.target")
  readonly target: StorageTarget;

  @IsString()
  @IsNotEmpty()
  @From("storage.extension")
  readonly extension: string;
}
