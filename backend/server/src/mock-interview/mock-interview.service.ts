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
        ...interview.messages.map((msg) => ({
          role: msg.role === 'ai' ? 'assistant' : 'user',
          content: msg.content,
        })),
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

  async evaluate(interviewId: string) {
    const interview = await this.model.findById(interviewId);

    if (!interview) {
      throw new NotFoundException('Interview not found');
    }

    // ✅ Convert messages → Q/A
    let formatted = '';

    for (let i = 0; i < interview.messages.length; i++) {
      const msg = interview.messages[i];

      if (msg.role === 'ai') {
        formatted += `Question: ${msg.content}\n`;
      } else {
        formatted += `Answer: ${msg.content}\n\n`;
      }
    }

    // 🤖 AI FINAL EVALUATION
    const aiRes = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `
You are a senior technical interviewer.

Evaluate the candidate.

Return ONLY JSON:

{
  "communication": number (0-10),
  "technical": number (0-10),
  "confidence": number (0-10),
  "overall": number (0-10),
  "summary": "short paragraph",
  "suggestions": ["point1", "point2"]
}

Rules:
- Communication → clarity, grammar
- Technical → correctness
- Confidence → depth
- Overall → average

STRICT: Only JSON
`,
        },
        {
          role: 'user',
          content: `
Role: ${interview.role}
Level: ${interview.level}
Tech Stack: ${interview.techStack.join(', ')}

Interview:
${formatted}
`,
        },
      ],
    });

    const content = aiRes.choices?.[0]?.message?.content || '';

    let parsed;

    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = {
        communication: 5,
        technical: 5,
        confidence: 5,
        overall: 5,
        summary: 'Average performance',
        suggestions: ['Practice more'],
      };
    }

    // ✅ Save result
    interview.finalFeedback = parsed;
    await interview.save();

    return parsed;
  }
}
