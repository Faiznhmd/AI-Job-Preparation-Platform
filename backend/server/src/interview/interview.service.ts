import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { GenerateQuestionDto } from './dto/generate-question.dto';

import { Interview } from './schemas/interview.schema';
import { AiService } from 'src/resume/ai/ai.service';
import { Resume } from 'src/resume/schema/resume.schema';

@Injectable()
export class InterviewService {
  constructor(
    private aiService: AiService,

    @InjectModel(Resume.name)
    private resumeModel: Model<Resume>,

    @InjectModel(Interview.name)
    private interviewModel: Model<Interview>,
  ) {}

  async generateQuestions(dto: GenerateQuestionDto, userId: string) {
    const { role, difficulty = 'medium', count = 5 } = dto;

    // 1️⃣ Fetch Resume
    const resume = await this.resumeModel.findOne({
      userId: userId, // ✅ STRING MATCH
    });
    console.log('FOUND RESUME:', resume);

    if (!resume) {
      throw new NotFoundException(
        'Resume not found. Please upload resume first.',
      );
    }

    // 2️⃣ Build Prompt
    const prompt = `
You are an expert technical interviewer.

Analyze this resume:
${resume.extractedText}   // ✅ FIXED

Generate ${count} interview questions.

Role: ${role}
Difficulty: ${difficulty}

Return JSON:
{
  "technical": [],
  "hr": [],
  "improvement": []
}
`;

    // 3️⃣ Call AI
    const aiResponse = await this.aiService.askAI(prompt);

    // 4️⃣ Parse JSON
    let parsed;
    try {
      parsed = JSON.parse(aiResponse);
    } catch {
      parsed = { raw: aiResponse };
    }

    // 5️⃣ Save to DB
    const saved = await this.interviewModel.create({
      userId,
      role,
      difficulty,
      count,
      questions: parsed,
    });

    return saved;
  }

  // 🔁 Get History
  async getHistory(userId: string) {
    return this.interviewModel.find({ userId }).sort({ createdAt: -1 });
  }
}
