import { randomUUID } from "crypto";
import { VideoId } from "../types/video";

export const generateVideoId = (): VideoId => randomUUID();
