import { IsString } from 'class-validator';

export class AnswerDto {
  @IsString()
  interviewId!: string;

  @IsString()
  answer!: string;
}
