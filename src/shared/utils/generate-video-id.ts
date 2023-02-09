import { randomUUID } from "crypto";

export type VideoId = string;

export const generateVideoId = (): VideoId => randomUUID();
