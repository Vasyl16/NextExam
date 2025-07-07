import { MOVIE_IMAGE_FULL_PATH } from '@/constants/api';

export const getImagePath = (path: string) => {
  return `${MOVIE_IMAGE_FULL_PATH}${path}`;
};
