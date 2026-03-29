import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResumeService } from './resume.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthRequest } from 'src/common/types/auth-request';
import { Express } from 'express';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @UseGuards(JwtAuthGuard) // 🔥 PROTECT ROUTE
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File, @Req() req: AuthRequest) {
    console.log('UPLOAD USER:', req.user);
    const userId = req.user.id; // 🔥 GET REAL USER

    return this.resumeService.handleResume(file, userId);
  }
}
