import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Resume {
  @Prop()
  userId!: string;

  @Prop()
  fileName!: string;

  @Prop()
  filePath!: string;

  @Prop()
  extractedText!: string;

  @Prop([String])
  skills!: string[];

  @Prop([String])
  missingSkills!: string[];

  @Prop([String])
  suggestions!: string[];

  @Prop({ required: true })
  fileUrl!: string;

  // ✅ ADD THIS
  @Prop({ required: true })
  text!: string;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
