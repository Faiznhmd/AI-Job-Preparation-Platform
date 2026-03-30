import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MockInterviewDocument = MockInterview & Document;

@Schema({ timestamps: true })
export class MockInterview {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  role!: string;

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

  // ✅ NEW: FINAL FEEDBACK
  @Prop({
    type: {
      communication: Number,
      technical: Number,
      confidence: Number,
      overall: Number,
      summary: String,
      suggestions: [String],
    },
    default: null,
  })
  finalFeedback!: {
    communication: number;
    technical: number;
    confidence: number;
    overall: number;
    summary: string;
    suggestions: string[];
  };
}

export const MockInterviewSchema = SchemaFactory.createForClass(MockInterview);
