export type VideoId = string;

export interface VideoMetadata {
  codec: string;
  width: number;
  height: number;
  rFramerate: string; // the lowest framerate which all timestamps can be represented accurately with
  avgFramerate: string;
  colorSpace: string;
  colorPrimaries: string;
}

export type Resolution = {
  width: number;
  height: number;
};
