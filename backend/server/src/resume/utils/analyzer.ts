import { groq } from 'src/config/openai';

export const analyzeWithAI = async (text: string) => {
  const response = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      {
        role: 'system',
        content: `
You are an expert resume analyzer.
Return ONLY JSON:
{
  "role": "",
  "skills": [],
  "missingSkills": [],
  "suggestions": []
}
        `,
      },
      {
        role: 'user',
        content: `Analyze this resume:\n${text}`,
      },
    ],
  });

  const raw = response.choices[0].message.content || '';

  const clean = raw.replace(/```json|```/g, '').trim();

  return JSON.parse(clean);
};
