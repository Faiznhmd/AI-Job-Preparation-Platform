// roadmap.module.ts

import { MongooseModule } from '@nestjs/mongoose';
import { RoadmapSchema } from './schemas/roadmap.schema';
import { ResumeSchema } from 'src/resume/schema/resume.schema';
import { Module } from '@nestjs/common';
import { RoadmapController } from './roadmap.controller'; // ✅ ADD
import { RoadmapService } from './roadmap.service'; // ✅ ADD

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Roadmap', schema: RoadmapSchema },
      { name: 'Resume', schema: ResumeSchema },
    ]),
  ],
  controllers: [RoadmapController], // ✅ ADD
  providers: [RoadmapService], // ✅ ADD
})
export class RoadmapModule {}
