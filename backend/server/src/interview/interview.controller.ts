import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { GenerateQuestionDto } from './dto/generate-question.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthRequest } from 'src/common/types/auth-request';
import { Request } from 'express';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post('generate')
  generate(
    @Body() dto: GenerateQuestionDto, // ✅ MUST BE HERE
    @Req() req: AuthRequest,
  ) {
    console.log('🔥 DTO:', dto); // DEBUG

    const userId = req.user.id;

    return this.interviewService.generateQuestions(dto, userId);
  }

  // Get history
  @Get('history')
  getHistory(@Req() req: any) {
    const userId = req.user?.id || 'test-user';
    return this.interviewService.getHistory(userId);
  }
}
