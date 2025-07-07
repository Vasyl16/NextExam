export const BASE_URL = '';

export const ROUTES = {
  HOME: `/${BASE_URL}`,
  MOVIE: `${BASE_URL}/movie/:id`,
};

export const getMovieDetailRoute = (id: number) => `${BASE_URL}/movie/${id}`;
