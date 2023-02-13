import { IsNotEmpty, IsString } from "class-validator";
import { From } from "@unifig/core";

export class MongoConfig {
  @IsString()
  @IsNotEmpty()
  @From("dbUrl")
  readonly url: string;
}
