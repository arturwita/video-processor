import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";
import { From } from "@unifig/core";

export class ProcessingConfig {
  @IsString()
  @IsNotEmpty()
  @From("processing.format")
  readonly format: string;

  @IsInt()
  @IsPositive()
  @From("processing.targetWidth")
  readonly targetWidth: number;

  @IsInt()
  @IsPositive()
  @From("processing.targetHeight")
  readonly targetHeight: number;

  @IsInt()
  @IsPositive()
  @From("processing.paddedWidth")
  readonly paddedWidth: number;

  @IsInt()
  @IsPositive()
  @From("processing.paddedHeight")
  readonly paddedHeight: number;

  @IsString()
  @IsNotEmpty()
  @From("processing.padColor")
  readonly padColor: string;
}
