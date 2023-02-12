import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Video, VideoId } from "./video.schema";
import { Model } from "mongoose";

export type CreateVideoDto = Pick<Video, "_id" | "url" | "status">;

@Injectable()
export class VideoRepository {
  constructor(@InjectModel(Video.name) private readonly model: Model<Video>) {}

  public async getAll(): Promise<Video[]> {
    return this.model.find({});
  }

  public async getById(videoId: VideoId): Promise<Video | null> {
    return this.model.findById(videoId);
  }

  public async save(dto: CreateVideoDto): Promise<Video> {
    return this.model.create(dto);
  }
}
