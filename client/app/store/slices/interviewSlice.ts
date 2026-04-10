import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Question {
  question: string;
  answer?: string; // optional if not always present
}

interface InterviewState {
  questions: Question[];
  loading: boolean;
  error: string | null;
}

const initialState: InterviewState = {
  questions: null,
  loading: false,
  error: null,
};

// ✅ API CALL
export const generateQuestions = createAsyncThunk(
  'interview/generate',
  async (
    {
      role,
      difficulty,
      techStack,
    }: { role: string; difficulty: string; techStack: string },
    { rejectWithValue },
  ) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:4000/interview/generate',
        {
          role,
          difficulty,
          techStack,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data;
    } catch {
      return rejectWithValue(err.response?.data || 'Error');
    }
  },
);

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(generateQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default interviewSlice.reducer;
