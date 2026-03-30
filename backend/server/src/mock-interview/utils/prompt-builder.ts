export const buildInterviewPrompt = (
  history: any[],
  role: string,
  techStack: string[],
  level: string,
) => {
  const formattedHistory = history
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join('\n');

  return `
You are a professional interviewer.

Candidate Role: ${role}
Experience Level: ${level}
Skills: ${techStack?.join(', ')}

Instructions:
- Ask ONLY role-relevant questions
- Start from basics → advanced
- Ask follow-up questions
- Do NOT repeat questions

Conversation:
${formattedHistory}

Your tasks:
1. Evaluate last answer (1 line)
2. Ask next question

Return ONLY JSON:
{
  "feedback": "",
  "nextQuestion": ""
}
`;
};
