const SKILLS = [
  'react',
  'node',
  'mongodb',
  'express',
  'javascript',
  'dsa',
  'system design',
  'os',
];

export const extractSkills = (text: string) => {
  const lower = text.toLowerCase();

  const foundSkills: string[] = [];

  for (let i = 0; i < SKILLS.length; i++) {
    if (lower.includes(SKILLS[i])) {
      foundSkills.push(SKILLS[i]);
    }
  }

  return foundSkills;
};
