import axios from 'axios';

import { MOVIE_IMAGE_FULL_PATH } from '@/constants/api';

export const axiosMovieImageInstance = axios.create({
  baseURL: MOVIE_IMAGE_FULL_PATH,
});
