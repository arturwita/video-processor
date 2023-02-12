import { Injectable } from "@nestjs/common";
import * as ffmpeg from "fluent-ffmpeg";

@Injectable()
export class FFmpegCommandBuilder {
  private readonly command;

  constructor() {
    this.command = ffmpeg();
    return this;
  }

  build() {
    return this.command;
  }
}
