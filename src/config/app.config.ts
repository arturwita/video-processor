import { IsInt, IsPositive } from "class-validator";
import { From } from "@unifig/core";

export class AppConfig {
  @IsInt()
  @IsPositive()
  @From("app.port")
  readonly port: number;
}
