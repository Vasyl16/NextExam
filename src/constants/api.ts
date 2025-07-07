export const MOVIE_BASE_URL = 'https://api.themoviedb.org/3/';

export const NEWEST_MOVIE = 'movie/now_playing?language=en';

export const GENRES_MOVIE = 'genre/movie/list';

export const All_MOVIE = 'discover/movie';

export const SEARCH_MOVIES = 'search/movie';

export const MOVIE_IMAGE_FULL_PATH = 'https://image.tmdb.org/t/p/original/';

export const getMoiveFullPath = (id: string) => `movie/${id}`;
