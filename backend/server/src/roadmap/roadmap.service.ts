import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { groq } from 'src/config/openai';

@Injectable()
export class RoadmapService {
  constructor(
    @InjectModel('Resume') private resumeModel: Model<any>,
    @InjectModel('Roadmap') private roadmapModel: Model<any>,
  ) {}

  // 🔥 NORMALIZER (VERY IMPORTANT)
  private normalizeRoadmap(data: any) {
    return (data.roadmap || []).map((week: any) => ({
      week: week.week,
      topics: (week.topics || []).map((t: any) => {
        // ✅ Case 1: already correct
        if (t.task) {
          return {
            task: t.task,
            description: t.description || '',
            days: Array.isArray(t.days) ? t.days : [],
            resources: t.resources || [],
          };
        }

        // ✅ Case 2: AI gives title + tasks
        if (t.title && Array.isArray(t.tasks)) {
          return {
            task: t.title,
            description: t.tasks.map((x: any) => x.task).join(', '),
            days: t.tasks
              .map((x: any) => {
                if (typeof x.day === 'number') return x.day;
                if (typeof x.day === 'string') return parseInt(x.day);
                return null;
              })
              .filter(Boolean),
            resources: [],
          };
        }

        // ❌ fallback → DO NOT keep empty
        return {
          task: t.title || 'Unknown Task',
          description: 'No description available',
          days: [],
          resources: [],
        };
      }),
    }));
  }

  // 🔥 GENERATE ROADMAP
  async generateRoadmap(userId: string, dto: any) {
    const { resumeId, targetRole, duration } = dto;

    // ✅ Validate input
    if (!resumeId || !targetRole || !duration) {
      throw new BadRequestException(
        'resumeId, targetRole and duration are required',
      );
    }

    // ✅ Fetch resume securely
    const resume = await this.resumeModel.findOne({
      _id: resumeId,
      userId,
    });

    if (!resume) {
      throw new BadRequestException('Resume not found or unauthorized');
    }

    const skills = resume.skills || [];
    const missingSkills = resume.missingSkills || [];

    // ✅ Prevent duplicate
    const existing = await this.roadmapModel.findOne({
      userId,
      resumeId,
      targetRole,
    });

    if (existing) return existing;

    // 🔥 AI PROMPT (STRICT FORMAT)
    const prompt = `
You are an expert career mentor AI.

Create a structured ${duration}-week roadmap.

STRICT RULES:
- Follow EXACT structure
- Do NOT change keys
- Do NOT add new keys like "title" or "tasks"
- "days" must be array of numbers
- Return ONLY valid JSON

FORMAT:
{
  "roadmap": [
    {
      "week": "Week 1",
      "topics": [
        {
          "task": "string",
          "description": "string",
          "days": [1,2],
          "resources": ["string"]
        }
      ]
    }
  ]
}

Target Role: ${targetRole}

Current Skills:
${skills.join(', ') || 'None'}

Missing Skills:
${missingSkills.join(', ') || 'None'}
`;

    // ✅ Call AI
    const response = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
    });

    if (!response || !response.choices?.length) {
      throw new BadRequestException('AI did not return a response');
    }

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new BadRequestException('AI response content is empty');
    }

    // ✅ Clean response
    const cleanContent = content
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    let parsed: any;

    // 🔥 SAFE PARSE
    try {
      parsed = JSON.parse(cleanContent);
    } catch {
      console.log('❌ RAW AI RESPONSE:', content);

      // try fixing ranges like 1-5
      const fixed = cleanContent.replace(/(\d+)-(\d+)/g, '"$1-$2"');

      try {
        parsed = JSON.parse(fixed);
      } catch {
        throw new BadRequestException('AI response parsing failed');
      }
    }

    // 🔥 NORMALIZE DATA
    const normalized = this.normalizeRoadmap(parsed);

    // ✅ Save to DB
    const roadmap = await this.roadmapModel.create({
      userId,
      resumeId,
      targetRole,
      roadmap: normalized,
    });

    return roadmap;
  }

  // 🔥 GET ROADMAPS
  async getUserRoadmaps(userId: string) {
    return this.roadmapModel.find({ userId }).sort({ createdAt: -1 });
  }
}
