'use client';

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { MovieOptionsType, MovieSliceState } from '@/types/movieTypes';
import { getMovie } from '@/api/services/getMovies';
import { restrictPages } from '@/helpers/restrictPages';

const initialState: MovieSliceState = {
  page: 1,
  total_pages: 1,
  results: [],
  status: 'success',
};

export const fetchMovies = createAsyncThunk(
  'movieSlice/fetchMovies',
  async (options: MovieOptionsType) => {
    const data = await getMovie(options);
    return data;
  }
);

export const movieSlice = createSlice({
  name: 'movieSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(fetchMovies.rejected, (state) => {
      state.status = 'error';
    });

    builder.addCase(
      fetchMovies.fulfilled,
      (state, action: PayloadAction<MovieSliceState>) => {
        state.status = 'success';
        state.total_pages = restrictPages(action.payload.total_pages);
        state.page =
          action.payload.page > state.total_pages
            ? state.total_pages
            : action.payload.page;
        state.results = action.payload.results;
      }
    );
  },
});

export default movieSlice.reducer;
