import type { Categorytype, SortOptionType } from '../types/movieTypes';

export const INITIAL_CATEGORY: Categorytype = {
  name: 'All',
};

export const SORT_OPTIONS: SortOptionType[] = [
  { name: 'Popularity(desc)', sortBy: 'popularity.desc' },
  { name: 'Popularity(asc)', sortBy: 'popularity.asc' },

  { name: 'Year(desc)', sortBy: 'primary_release_date.desc' },
  { name: 'Year(asc)', sortBy: 'primary_release_date.asc' },

  { name: 'Rating(asc)', sortBy: 'vote_average.asc' },
  { name: 'Rating(desc)', sortBy: 'vote_average.desc' },
];

export const CATEGORY_OPTIONS = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

export const INITIAL_SORT_OPTION = SORT_OPTIONS[0];
