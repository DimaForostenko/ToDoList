import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import activityReducer from './activitySlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    activity: activityReducer,
  },
});