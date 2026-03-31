import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadResumeAPI } from '../../services/uploadResumeAPI';

export interface ResumeResponse {
  skills: string[];
  missingSkills: string[];
  suggestions: string[];
}

interface ResumeState {
  loading: boolean;
  data: ResumeResponse | null;
  error: string | null;
}

const initialState: ResumeState = {
  loading: false,
  data: null,
  error: null,
};

// 🔥 USE SERVICE HERE
export const uploadResume = createAsyncThunk(
  'resume/upload',
  async (file: File, { rejectWithValue }) => {
    try {
      return await uploadResumeAPI(file);
    } catch (error: unknown) {
      return rejectWithValue(error.message);
    }
  },
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default resumeSlice.reducer;
