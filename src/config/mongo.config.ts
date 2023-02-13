import { IsNotEmpty, IsString } from "class-validator";
import { From } from "@unifig/core";

export class MongoConfig {
  @IsString()
  @IsNotEmpty()
  @From("database.url")
  readonly url: string;
}
