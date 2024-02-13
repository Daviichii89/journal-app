import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth';
import { journalSlice } from './slices/journal';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer
  }
});
