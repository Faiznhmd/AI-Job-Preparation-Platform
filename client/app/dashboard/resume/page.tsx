'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { uploadResume } from '@/redux/slices/resumeSlice';
import { RootState, AppDispatch } from '@/redux/store';
import { uploadResume } from '@/app/store/slices/resumeSlice';

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.resume,
  );

  const handleUpload = () => {
    if (!file) return;
    dispatch(uploadResume(file));
  };
  console.log('DATA 👉', data);

  return (
    <div className="max-w-3xl mx-auto">
      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-6">Resume Analyzer 🚀</h1>

      {/* ========================= */}
      {/* 1️⃣ UPLOAD BOX */}
      {/* ========================= */}
      <div className="border-2 border-dashed border-gray-700 p-8 rounded-xl text-center">
        <p className="text-gray-400 mb-3">
          Drag & drop your resume or click to upload
        </p>

        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          id="fileUpload"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <label
          htmlFor="fileUpload"
          className="cursor-pointer bg-gray-800 px-4 py-2 rounded-lg"
        >
          Choose File
        </label>

        {file && <p className="mt-3 text-sm text-green-400">{file.name}</p>}
      </div>

      {/* ========================= */}
      {/* 2️⃣ BUTTON */}
      {/* ========================= */}
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full bg-blue-600 py-3 rounded-xl mt-5 disabled:bg-gray-700"
      >
        {loading ? 'Analyzing...' : 'Upload & Analyze'}
      </button>

      {/* ========================= */}
      {/* 3️⃣ ERROR */}
      {/* ========================= */}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {/* ========================= */}
      {/* 4️⃣ LOADING */}
      {/* ========================= */}
      {loading && (
        <div className="mt-6 text-center text-gray-400">
          🔍 AI is analyzing your resume...
        </div>
      )}

      {/* ========================= */}
      {/* 5️⃣ RESULT CARD */}
      {/* ========================= */}
      {data && !loading && (
        <div className="mt-8 space-y-6">
          {/* Skills */}
          <div className="bg-gray-900 p-5 rounded-xl">
            <h2 className="font-semibold mb-2 text-green-400">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.data.skills?.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="bg-green-600 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="bg-gray-900 p-5 rounded-xl">
            <h2 className="font-semibold mb-2 text-red-400">Missing Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.data.missingSkills?.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="bg-red-600 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-gray-900 p-5 rounded-xl">
            <h2 className="font-semibold mb-2 text-blue-400">Suggestions</h2>
            <ul className="list-disc pl-5 text-gray-300">
              {data.data.suggestions?.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
