import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer'; // ✅ ADD THIS

export class GenerateQuestionDto {
  @IsString()
  role!: string;

  @IsOptional()
  @IsString()
  difficulty?: string;

  @IsOptional()
  @Type(() => Number) // 🔥 VERY IMPORTANT
  @IsNumber()
  count?: number;
}
