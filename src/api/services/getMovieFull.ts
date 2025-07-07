import { getMoiveFullPath } from '@/constants/api';
import type { MovieFullType } from '@/types/movieTypes';
import { axiosMovieInstance } from '../axios/axiosMovieInstance';

export const getMovieFull = async (id: string) => {
  const response = await axiosMovieInstance<MovieFullType>(
    getMoiveFullPath(id)
  );

  return response.data;
};
