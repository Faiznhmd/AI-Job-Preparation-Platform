// dto/create-roadmap.dto.ts

import { IsString, IsNumber } from 'class-validator';

export class CreateRoadmapDto {
  @IsString()
  resumeId!: string;

  @IsString()
  targetRole!: string;

  @IsNumber()
  duration!: number;
}
