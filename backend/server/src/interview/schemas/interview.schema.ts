import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InterviewDocument = Interview & Document;

@Schema({ timestamps: true })
export class Interview {
  @Prop()
  userId!: string;

  @Prop()
  role!: string;

  @Prop()
  difficulty!: string;

  @Prop()
  count!: number;

  @Prop({ type: Object })
  questions!: any;
}

export const InterviewSchema = SchemaFactory.createForClass(Interview);
