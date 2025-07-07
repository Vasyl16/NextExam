import axios from 'axios';
import { MOVIE_BASE_URL } from '@/constants/api';

export const axiosMovieInstance = axios.create({
  baseURL: MOVIE_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_TOKEN}`,
  },
});
