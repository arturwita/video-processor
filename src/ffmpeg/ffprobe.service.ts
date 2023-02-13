import { Injectable } from "@nestjs/common";
import { ffprobe, FfprobeData } from "fluent-ffmpeg";

@Injectable()
export class FFprobeService {
  public async getVideoMeta(videoUrl: string): Promise<FfprobeData> {
    return new Promise((resolve, reject) =>
      ffprobe(videoUrl, (error, data) => {
        if (error) {
          return reject(error);
        }
        resolve(data);
      })
    );
  }
}
