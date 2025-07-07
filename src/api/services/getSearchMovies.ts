import { SEARCH_MOVIES } from '@/constants/api';
import type { SearchMovieType } from '@/types/movieTypes';
import { axiosMovieInstance } from '../axios/axiosMovieInstance';

export const getSearchMovies = async (searchText: string) => {
  const response = await axiosMovieInstance<{ results: SearchMovieType[] }>(
    `${SEARCH_MOVIES}?query=${searchText}`
  );

  return response.data.results;
};
