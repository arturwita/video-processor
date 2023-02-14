import { Injectable } from "@nestjs/common";
import * as ffmpeg from "fluent-ffmpeg";
import { PassThrough, Writable } from "stream";
import { VideoMetadata, Resolution } from "../shared/types/video";
import { ProcessingConfig } from "../config/processing.config";

@Injectable()
export class FFmpegService {
  /**
   * Transform method flow:
   * 1. Scale the original video to new dimensions.
   * 2. Pad the scaled video.
   * 3. Save the result into a stream, so it can be then saved based on configured strategy (e.g. locally, or in S3).
   */
  public async transform(
    url: string,
    meta: VideoMetadata,
    config: ProcessingConfig
  ): Promise<Writable> {
    const stream = new PassThrough();
    const {
      format,
      targetHeight,
      targetWidth,
      paddedHeight,
      paddedWidth,
      padColor,
    } = config;

    const scaleFilter = this.getScaleFilter(meta, {
      width: targetWidth,
      height: targetHeight,
    });
    const padFilter = this.getPadFilter(
      { width: paddedWidth, height: paddedHeight },
      padColor
    );

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

  private getScaleFilter(
    meta: VideoMetadata,
    resolution: Resolution
  ): ffmpeg.AudioVideoFilter {
    const { width, height } = meta;
    const { width: newWidth, height: newHeight } = resolution;

    const scaledWidth = `${width}*max(${newWidth}/${width}\\,${newHeight}/${height})`;
    const scaledHeight = `${height}*max(${newWidth}/${width}\\,${newHeight}/${height})`;

    return {
      filter: "scale",
      options: `${scaledWidth}:${scaledHeight}`,
    };
  }

  private getPadFilter(
    resolution: Resolution,
    color: string
  ): ffmpeg.AudioVideoFilter {
    const { width, height } = resolution;
    const horizontalAlign = "(ow-iw)/2";
    const verticalAlign = "(oh-ih)/2";

    return {
      filter: "pad",
      options: `${width}:${height}:${horizontalAlign}:${verticalAlign}:${color}`,
    };
  }
}
