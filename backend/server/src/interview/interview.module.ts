import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { Interview, InterviewSchema } from './schemas/interview.schema';
import { Resume, ResumeSchema } from 'src/resume/schema/resume.schema';
import { AiModule } from 'src/resume/ai/ai.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Interview.name, schema: InterviewSchema },
      { name: Resume.name, schema: ResumeSchema },
    ]),
    AiModule,
    AuthModule,
  ],
  controllers: [InterviewController],
  providers: [InterviewService],
})
export class InterviewModule {}
