import { IsString, IsArray, IsOptional } from 'class-validator';

export class StartMockInterviewDto {
  @IsString()
  role!: string;

  @IsString()
  level!: string;

  @IsOptional()
  @IsArray()
  techStack?: string[];
}
