import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ProcessingStatus } from "../domain/processing-status.enum";
import { VideoId, VideoMetadata } from "../shared/types/video";

@Schema({ collection: "videos" })
export class Video extends Document {
  @Prop({ required: true, unique: true })
  _id: VideoId;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, enum: ProcessingStatus })
  status: ProcessingStatus;

  @Prop(
    raw({
      codec: { type: String },
      rFramerate: { type: String },
      avgFramerate: { type: String },
      colorSpace: { type: String },
      colorPrimaries: { type: String },
      width: { type: Number },
      height: { type: Number },
    })
  )
  meta: VideoMetadata;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
