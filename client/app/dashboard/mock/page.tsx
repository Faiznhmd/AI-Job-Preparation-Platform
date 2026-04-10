'use client';

import {
  evaluateInterview,
  sendAnswer,
  startInterview,
} from '@/app/services/mockInterview';
import { useState } from 'react';

export default function MockInterviewPage() {
  const [interviewId, setInterviewId] = useState<string | null>(null);
  const [messages, setMessages] = useState<
    { role: 'ai' | 'user'; content: string }[]
  >([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  type Feedback = {
    score: number;
    message: string;
  };

  // 🚀 Start Interview
  const handleStart = async () => {
    try {
      const res = await startInterview({
        role: 'Frontend Developer',
        level: 'Beginner',
        techStack: ['React', 'JavaScript'],
      });

      setInterviewId(res.interviewId);

      setMessages([{ role: 'ai', content: res.question }]);
    } catch (err) {
      console.error(err);
      alert('Error starting interview');
    }
  };

  // 💬 Send Answer
  const handleSend = async () => {
    if (!input.trim() || !interviewId) return;

    const userMsg = { role: 'user', content: input };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await sendAnswer({
        interviewId,
        answer: input,
      });

      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: res.nextQuestion },
      ]);
    } catch (err) {
      console.error(err);
      alert('Error sending answer');
    }

    setLoading(false);
  };

  // 🏁 Finish Interview
  const handleFinish = async () => {
    if (!interviewId) return;

    try {
      const res = await evaluateInterview(interviewId);
      setFeedback(res);
    } catch (err) {
      console.error(err);
      alert('Error evaluating interview');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mock Interview</h1>

      {/* START BUTTON */}
      {!interviewId && (
        <button
          onClick={handleStart}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Start Interview
        </button>
      )}

      {/* CHAT BOX */}
      {interviewId && (
        <>
          <div className="mt-6 border p-4 h-[400px] overflow-y-auto rounded">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 ${
                  msg.role === 'ai' ? 'text-left' : 'text-right'
                }`}
              >
                <p
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.role === 'ai'
                      ? 'bg-red-400-200'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {msg.content}
                </p>
              </div>
            ))}

            {loading && <p className="text-gray-500">AI is thinking...</p>}
          </div>

          {/* INPUT */}
          <div className="mt-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border p-2 rounded"
              placeholder="Type your answer..."
            />

            <button
              onClick={handleSend}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>

          {/* FINISH BUTTON */}
          <button
            onClick={handleFinish}
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
          >
            Finish Interview
          </button>
        </>
      )}

      {/* FEEDBACK */}
      {feedback && (
        <div className="mt-6 border p-4 rounded bg-red-400-50">
          <h2 className="text-lg font-bold mb-2">Final Feedback</h2>
          <p>Communication: {feedback.communication}</p>
          <p>Technical: {feedback.technical}</p>
          <p>Confidence: {feedback.confidence}</p>
          <p>Overall: {feedback.overall}</p>
          <p className="mt-2">{feedback.summary}</p>

          <ul className="mt-2 list-disc pl-5">
            {feedback.suggestions?.map((s: string, i: number) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
