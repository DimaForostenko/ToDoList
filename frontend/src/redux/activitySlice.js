import { createSlice } from '@reduxjs/toolkit';

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    logs: [],
  },
  reducers: {
    addActivity: (state, action) => {
      state.logs.unshift({
        id: Date.now(),
        message: action.payload,
        timestamp: new Date().toISOString(),
      });
    },
  },
});

export const { addActivity } = activitySlice.actions;
export default activitySlice.reducer;