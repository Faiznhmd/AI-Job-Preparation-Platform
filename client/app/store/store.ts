import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import resumeReducer from './slices/resumeSlice.ts';
import interviewReducer from './slices/interviewSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resume: resumeReducer,
    interview: interviewReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
