import { Injectable } from "@nestjs/common";
import * as ffmpeg from "fluent-ffmpeg";
import {
  AudioVideoFilter,
  FfmpegCommand,
  ScreenshotsConfig,
} from "fluent-ffmpeg";
import { createWriteStream } from "fs";
import { VideoMetadata } from "../shared/types/video";
import { VideoAnalyzedEventPayload } from "../domain/events/video-analyzed.event";
import { PassThrough } from "stream";

@Injectable()
export class FFmpegService {
  /**
   * Transform method flow:
   * 1. Scale the original video to new dimensions (640x480)
   * 2. Pad the scaled video so its resolution is 1000x1000 (Instagram format)
   * 3. Save the result into a stream, so it can be then saved somewhere (e.g. locally, or in S3)
   */
  public async transform({
    meta,
    url,
    videoId,
  }: VideoAnalyzedEventPayload): Promise<any> {
    const format = "mp4";
    const path = `${videoId}.${format}`;
    const stream = new PassThrough();
    // const stream = createWriteStream(path);

    const scaleFilter = this.getScaleFilter(meta);
    const padFilter = this.getPadFilter();

    return new Promise((resolve) => {
      const res = ffmpeg(url)
        // .videoFilters([scaleFilter, padFilter])
        // .videoFilters([padFilter])
        .format(format)
        .noAudio()
        .on("start", function (cmd) {
          console.log({ tmp: new Date(), cmd });
        })
        .on("error", function (err, stdout, stderr) {
          console.log({ tmp: new Date(), stderr });
        })
        .pipe(stream, { end: true })
        .on("data", function (chunk) {
          console.log({ writtenChunks: chunk.length });
        });

      resolve(res);
    });
  }

  /**
   * CreateThumbnail method flow:
   * 1. Take a screenshot of the initial frame
   * 2. Save the PNG into a stream, so it can be then saved somewhere (e.g. locally, or in S3)
   */
  public async createThumbnail({
    videoId,
    url,
  }: VideoAnalyzedEventPayload): Promise<FfmpegCommand> {
    const path = `${videoId}_thumbnail.png`;
    const stream = createWriteStream(path);
    const screenshotConfig: ScreenshotsConfig = {
      count: 1,
      size: "320x240",
    };
    console.log(new Date(), "thumbnail stream", stream);

    return new Promise((resolve) => {
      resolve(
        ffmpeg(url).screenshot(screenshotConfig).output(stream, { end: true })
      );
    });
  }

  private getScaleFilter(meta: VideoMetadata): AudioVideoFilter {
    const { width, height } = meta;
    const newWidth = 640;
    const newHeight = 480;

    const scaledWidth = `${width}*max(${newWidth}/${width}\\,${newHeight}/${height})`;
    const scaledHeight = `${height}*max(${newWidth}/${width}\\,${newHeight}/${height})`;

    return {
      filter: "scale",
      options: `${scaledWidth}:${scaledHeight}`,
    };
  }

  private getPadFilter(): AudioVideoFilter {
    const pad = 1300;
    const horizontalAlign = "(ow-iw)/2";
    const verticalAlign = "(oh-ih)/2";
    const color = "white";

    return {
      filter: "pad",
      options: `${pad}:${pad}:${horizontalAlign}:${verticalAlign}:${color}`,
    };
  }
}
