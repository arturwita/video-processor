import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ProcessingStatus } from "../domain/processing-status.enum";

export type VideoId = string;

@Schema({ collection: "videos" })
export class Video extends Document {
  @Prop({ required: true, unique: true })
  _id: VideoId;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, enum: ProcessingStatus })
  status: ProcessingStatus;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
