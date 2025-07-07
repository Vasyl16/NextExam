import { NEWEST_MOVIE } from '../../constants/api';
import { axiosMovieInstance } from '../axios/axiosMovieInstance';
import type { NewestMovieData } from '@/types/movieTypes';

export const getNewestMovies = async (
  revalidate = 3600
): Promise<NewestMovieData[]> => {
  try {
    // Option 1: Use native fetch when you need ISR
    const response = await fetch(
      `${axiosMovieInstance.defaults.baseURL}${NEWEST_MOVIE}`,
      {
        next: { revalidate, tags: ['newest-movies'] },
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_TOKEN}`,
        },
      }
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Failed to fetch newest movies:', error);
    return [];
  }
};
