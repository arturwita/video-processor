import { randomUUID } from "crypto";
import { VideoId } from "../../video/video.schema";

export const generateVideoId = (): VideoId => randomUUID();
