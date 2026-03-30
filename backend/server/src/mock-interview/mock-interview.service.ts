import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  MockInterview,
  MockInterviewDocument,
} from './schemas/mock-interview.schema';

import { StartMockInterviewDto } from './dto/start-mock-interview.dto';
import { AnswerDto } from './dto/answer.dto';
import { buildInterviewPrompt } from './utils/prompt-builder';

import { groq } from 'src/config/openai';

@Injectable()
export class MockInterviewService {
  constructor(
    @InjectModel(MockInterview.name)
    private model: Model<MockInterviewDocument>, // ✅ FIXED TYPE
  ) {}

  // 🚀 START INTERVIEW
  async start(userId: string, dto: StartMockInterviewDto) {
    const firstQuestion = `Introduce yourself for the role of ${dto.role}`;

    const interview = await this.model.create({
      userId,
      role: dto.role,
      level: dto.level,
      techStack: dto.techStack || [],
      messages: [
        {
          role: 'ai',
          content: firstQuestion,
        },
      ],
    });

    return {
      interviewId: interview._id,
      question: firstQuestion,
    };
  }

  // 💬 ANSWER + NEXT QUESTION
  async answer(dto: AnswerDto) {
    const interview = await this.model.findById(dto.interviewId);

    // ✅ HANDLE NULL (IMPORTANT)
    if (!interview) {
      throw new NotFoundException('Interview not found');
    }

    // 1️⃣ Save user answer
    interview.messages.push({
      role: 'user',
      content: dto.answer,
    });

    // 2️⃣ Build AI prompt
    const prompt = buildInterviewPrompt(
      interview.messages,
      interview.role,
      interview.techStack,
      interview.level,
    );

    // 3️⃣ Call AI
    const aiRes = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: prompt,
        },
      ],
    });

    // ✅ SAFE CONTENT HANDLING
    const content = aiRes.choices?.[0]?.message?.content || '';

    let parsed: { feedback: string; nextQuestion: string };

    try {
      parsed = JSON.parse(content);
    } catch {
      // fallback if AI gives bad JSON
      parsed = {
        feedback: 'Good attempt, but try to be more structured.',
        nextQuestion: 'Can you explain this in more detail?',
      };
    }

    // 4️⃣ Save AI next question
    interview.messages.push({
      role: 'ai',
      content: parsed.nextQuestion,
    });

    // 5️⃣ Save to DB
    await interview.save();

    return parsed;
  }
}
