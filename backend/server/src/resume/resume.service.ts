import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { extractTextFromPDF } from './utils/pdfParser';
import { analyzeWithAI } from './utils/analyzer';

@Injectable()
export class ResumeService {
  async handleResume(file: Express.Multer.File) {
    if (!file || !file.buffer) {
      throw new Error('File buffer missing ❌');
    }

    // ✅ use buffer (NOT path)
    const text = await extractTextFromPDF(file.buffer);

    const result = await analyzeWithAI(text);

    return {
      message: 'Resume analyzed successfully',
      data: result,
    };
  }
}
