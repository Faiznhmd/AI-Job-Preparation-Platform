'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store/store';
import { generateQuestions } from '@/app/store/slices/interviewSlice';

export default function InterviewForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [role, setRole] = useState('');
  const [techStack, setTechStack] = useState('');
  const [difficulty, setDifficulty] = useState('medium');

  const handleSubmit = () => {
    if (!role || !techStack) {
      alert('Please enter role and tech stack');
      return;
    }

    dispatch(generateQuestions({ role, difficulty, techStack }));
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Generate Interview Questions</h2>

      {/* ROLE INPUT */}
      <input
        type="text"
        placeholder="Enter Role (e.g. Full Stack Developer)"
        className="w-full p-2 mb-4 bg-gray-800 rounded"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      {/* TECH STACK INPUT */}
      <input
        type="text"
        placeholder="Tech Stack (e.g. React, Node, MongoDB)"
        className="w-full p-2 mb-4 bg-gray-800 rounded"
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
      />

      {/* DIFFICULTY */}
      <select
        className="w-full p-2 mb-4 bg-gray-800 rounded"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 px-4 py-2 rounded-lg w-full hover:bg-blue-700"
      >
        Generate Questions
      </button>
    </div>
  );
}
