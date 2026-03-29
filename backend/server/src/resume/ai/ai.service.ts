import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';

@Injectable()
export class AiService {
  private groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  // ✅ COMMON METHOD (used everywhere)
  async askAI(prompt: string): Promise<string> {
    const response = await this.groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile', // ⚡ fast + free (Instant AI)
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return response.choices[0].message.content ?? '';
  }
}
