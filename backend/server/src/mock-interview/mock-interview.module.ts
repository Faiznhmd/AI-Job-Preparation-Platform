import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MockInterview,
  MockInterviewSchema,
} from './schemas/mock-interview.schema';
import { MockInterviewService } from './mock-interview.service';
import { MockInterviewController } from './mock-interview.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MockInterview.name, schema: MockInterviewSchema },
    ]),
  ],
  controllers: [MockInterviewController],
  providers: [MockInterviewService],
})
export class MockInterviewModule {}
