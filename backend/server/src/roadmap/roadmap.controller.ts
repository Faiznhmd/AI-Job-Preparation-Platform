import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { Request } from 'express';

// ✅ custom request type
interface AuthRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

@Controller('roadmap')
export class RoadmapController {
  constructor(private roadmapService: RoadmapService) {}

  @UseGuards(JwtAuthGuard)
  @Post('generate')
  async generate(
    @Body() dto: CreateRoadmapDto,
    @Req() req: AuthRequest, // ✅ FIXED
  ) {
    if (!req.user || !req.user.id) {
      throw new BadRequestException('User not authenticated');
    }

    return this.roadmapService.generateRoadmap(req.user.id, dto);
  }
}
