import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { MockInterviewService } from './mock-interview.service';
import { StartMockInterviewDto } from './dto/start-mock-interview.dto';
import { AnswerDto } from './dto/answer.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

interface AuthRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

@Controller('mock-interview')
export class MockInterviewController {
  constructor(private readonly service: MockInterviewService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('start')
  start(@Req() req: AuthRequest, @Body() dto: StartMockInterviewDto) {
    const userId = req.user.id; // ✅ now typed
    console.log('USER:', req.user);
    return this.service.start(userId, dto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('answer')
  answer(@Body() dto: AnswerDto) {
    return this.service.answer(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('evaluate')
  evaluate(@Body() body: { interviewId: string }) {
    console.log('BODY:', body);
    if (!body || !body.interviewId) {
      throw new Error('interviewId is required');
    }

    return this.service.evaluate(body.interviewId);
  }
}
