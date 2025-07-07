export interface NewestMovieData {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

export interface MovieSliceState {
  page: number;
  total_pages: number;
  results: MovieData[];
  status: 'success' | 'error' | 'loading';
}
export interface MovieData {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

export type Categorytype = {
  name: string;
  id?: number;
};

export type SortOptionType = {
  name: string;
  sortBy: string;
};

export type MovieOptionsType = {
  page: number;
  genreId?: number;
  sortBy: string;
};

export type SearchMovieType = {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  overview: string;
};

export type MovieFullType = {
  poster_path: string;
  title: string;
  vote_average: string;
  vote_count: string;
  genres: { name: string; id: number }[];
  production_countries: { name: string }[];
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  overview: string;
};
