import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";
import { From } from "@unifig/core";

export class AppConfig {
  @IsInt()
  @IsPositive()
  @From("app.port")
  readonly port: number;

  @IsString()
  @IsNotEmpty()
  @From("app.name")
  readonly name: string;
}
