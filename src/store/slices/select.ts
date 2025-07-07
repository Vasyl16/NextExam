import type { RootState } from '../store';

export const selectMovieState = (state: RootState) => state.movieSlice;
