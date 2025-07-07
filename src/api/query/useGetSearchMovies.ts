'use client';

import { useQuery } from '@tanstack/react-query';
import { getSearchMovies } from '../services/getSearchMovies';
import type { SearchMovieType } from '@/types/movieTypes';

export const useGetSearchMovies = (searchText = '', enabled = true) => {
  return useQuery<SearchMovieType[]>({
    queryKey: ['searchMovie', searchText],
    queryFn: () => getSearchMovies(searchText),
    enabled,
  });
};
