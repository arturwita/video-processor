import { randomUUID } from "crypto";
import { VideoId } from "../types/video-id";

export const generateVideoId = (): VideoId => randomUUID();
