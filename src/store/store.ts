'use client';

import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import movieSlice from './slices/movieSlice';

export const store = configureStore({
  reducer: {
    movieSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
