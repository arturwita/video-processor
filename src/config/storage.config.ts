import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { From } from "@unifig/core";
import { StorageType } from "../processing/storage/abstract/video-storage";

export class StorageConfig {
  @IsString()
  @IsNotEmpty()
  @From("storage.destination")
  readonly outputDirectory: string;

  @IsEnum(StorageType)
  @From("storage.type")
  readonly storageType: StorageType;
}
