import { Schema } from 'mongoose';

export const RoadmapSchema = new Schema(
  {
    userId: String,
    resumeId: String,
    targetRole: String,

    roadmap: [
      {
        week: String,

        topics: [
          {
            task: String, // ✅ FIXED
            description: String, // ✅ FIXED
            days: [Number], // ✅ FIXED
            resources: [String], // ✅ FIXED
          },
        ],
      },
    ],
  },
  { timestamps: true },
);
