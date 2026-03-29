import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { extractTextFromPDF } from './utils/pdfParser';
import { analyzeWithAI } from './utils/analyzer';
import { Resume } from './schema/resume.schema';

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(Resume.name)
    private resumeModel: Model<Resume>,
  ) {}

  async handleResume(file: Express.Multer.File, userId: string) {
    if (!file || !file.buffer) {
      throw new Error('File buffer missing ❌');
    }

    // ✅ extract text
    const text = await extractTextFromPDF(file.buffer);

    // ✅ AI analysis
    const result = await analyzeWithAI(text);

    type SuggestionType = string | { suggestion: string };

    const cleanedSuggestions = (result.suggestions || []).map(
      (item: SuggestionType) => {
        if (typeof item === 'string') return item;
        return item.suggestion;
      },
    );

    // 🔥 SAVE TO DB (VERY IMPORTANT)
    const savedResume = await this.resumeModel.create({
      userId,
      fileName: file.originalname,
      fileUrl: file.originalname, // or path if storing
      extractedText: text,
      skills: result.skills,
      missingSkills: result.missingSkills,
      suggestions: cleanedSuggestions,
      text: text, // 🔥 MUST MATCH SCHEMA
    });

    return {
      message: 'Resume analyzed & saved successfully',
      data: savedResume,
    };
  }
}
