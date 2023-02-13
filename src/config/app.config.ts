import { IsInt, IsPositive } from "class-validator";
import { From } from "@unifig/core";

export class AppConfig {
  @IsInt()
  @IsPositive()
  @From("port")
  readonly port: number;
}
