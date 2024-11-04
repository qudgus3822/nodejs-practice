import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  writer: string;

  @Prop()
  password: string;

  @Prop()
  createdDt: Date;

  @Prop()
  updatedDt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
