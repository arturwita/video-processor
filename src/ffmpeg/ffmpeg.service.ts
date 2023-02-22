import { Injectable } from "@nestjs/common";
import * as ffmpeg from "fluent-ffmpeg";
import { PassThrough, Writable } from "stream";
import { VideoMetadata } from "../shared/types/video";
import { VideoAnalyzedEventPayload } from "../domain/events/video-analyzed.event";

@Injectable()
export class FFmpegService {
  /**
   * Transform method flow:
   * 1. Scale the original video to new dimensions (640x480)
   * 2. Pad the scaled video so its resolution is 1000x1000 (Instagram format)
   * 3. Save the result into a stream, so it can be then saved somewhere (e.g. locally, or in S3)
   */
  public async transform({
    url,
    meta,
  }: VideoAnalyzedEventPayload): Promise<Writable> {
    const stream = new PassThrough();
    const format = "mp4";

    const scaleFilter = this.getScaleFilter(meta);
    const padFilter = this.getPadFilter();

    return new Promise((resolve) => {
      resolve(
        ffmpeg(url)
          .videoFilters([scaleFilter, padFilter])
          .outputOptions("-movflags frag_keyframe+empty_moov")
          .toFormat(format)
          .pipe(stream, { end: true })
      );
    });
  }

  private getScaleFilter(meta: VideoMetadata): ffmpeg.AudioVideoFilter {
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

  private getPadFilter(): ffmpeg.AudioVideoFilter {
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
