import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Resume, ResumeSchema } from './schema/resume.schema';

@Module({
  controllers: [ResumeController],
  providers: [ResumeService],
  imports: [
    MongooseModule.forFeature([{ name: Resume.name, schema: ResumeSchema }]),
  ],
})
export class ResumeModule {}
