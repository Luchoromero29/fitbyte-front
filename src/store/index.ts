// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.ts';
import planReducer from './planSlice.ts';
import exerciseReducer from './exerciseSlice.ts';
import preferenceReducer from './preferenceSlice.ts';

const store = configureStore({
  reducer: {
    auth: authReducer,
    plan: planReducer,
    exercise: exerciseReducer,
    preferenceUser: preferenceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
