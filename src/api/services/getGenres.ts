import { GENRES_MOVIE } from '../../constants/api';
import type { Categorytype } from '@/types/movieTypes';
import { axiosMovieInstance } from '../axios/axiosMovieInstance';

export const getGenres = async () => {
  const response = await axiosMovieInstance.get<{ genres: Categorytype[] }>(
    GENRES_MOVIE
  );

  return response.data.genres;
};
