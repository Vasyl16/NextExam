import { All_MOVIE } from '@/constants/api';
import { getCurrentDateFormatted } from '@/helpers/formatDate';
import type { MovieOptionsType, MovieSliceState } from '@/types/movieTypes';
import { axiosMovieInstance } from '../axios/axiosMovieInstance';

export const getMovie = async (options: MovieOptionsType) => {
  const { page, genreId, sortBy } = options;

  const params = new URLSearchParams();

  if (page) params.set('page', String(page));
  if (genreId) params.set('with_genres', String(genreId));
  if (sortBy) params.set('sort_by', String(sortBy));

  params.set('primary_release_date.lte', getCurrentDateFormatted());

  const response = await axiosMovieInstance.get<MovieSliceState>(All_MOVIE, {
    params,
  });

  return response.data;
};
