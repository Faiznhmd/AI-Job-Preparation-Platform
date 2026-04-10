'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

export default function QuestionList() {
  const { questions, loading, error } = useSelector(
    (state: RootState) => state.interview,
  );

  if (loading) return <p className="mt-4">Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!questions) return <p className="mt-4">No questions yet</p>;

  interface ParsedInterviewData {
    technical: TechnicalQuestion[];
  }

  // 🔥 Parse AI response
  let parsedData: ParsedInterviewData | null = null;

  try {
    const raw = questions?.questions?.raw || '';
    const jsonStart = raw.indexOf('{');
    const jsonEnd = raw.lastIndexOf('}') + 1;

    const cleanJson = raw.slice(jsonStart, jsonEnd);
    parsedData = JSON.parse(cleanJson);
  } catch (err) {
    console.error('Parsing error:', err);
  }

  interface TechnicalQuestion {
    question: string;
    topic: string;
  }

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-bold">Questions</h2>

      {parsedData?.technical?.map((q: TechnicalQuestion, index: number) => (
        <div key={index} className="bg-gray-800 p-4 rounded-lg">
          <p className="font-semibold">{q.question}</p>
          <span className="text-sm text-gray-400">{q.topic}</span>
        </div>
      ))}
    </div>
  );
}
