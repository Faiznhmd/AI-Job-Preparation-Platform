import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MockInterviewDocument = MockInterview & Document;

@Schema({ timestamps: true })
export class MockInterview {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  role!: string; // 🔥 dynamic

  @Prop({ required: true })
  level!: string;

  @Prop({ type: [String], default: [] })
  techStack!: string[];

  @Prop({
    type: [
      {
        role: String,
        content: String,
      },
    ],
    default: [],
  })
  messages!: {
    role: 'ai' | 'user';
    content: string;
  }[];
}

export const MockInterviewSchema = SchemaFactory.createForClass(MockInterview);
