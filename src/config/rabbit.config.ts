import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";
import { From } from "@unifig/core";

export class RabbitConfig {
  @IsString()
  @IsNotEmpty()
  @From("rabbit.exchangeName")
  readonly exchangeName: string;

  @IsString()
  @IsNotEmpty()
  @From("rabbit.queueName")
  readonly queueName: string;

  @IsString()
  @IsNotEmpty()
  @From("rabbit.login")
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  @From("rabbit.password")
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @From("rabbit.host")
  readonly host: string;

  @IsInt()
  @IsPositive()
  @From("rabbit.port")
  readonly port: number;
}
