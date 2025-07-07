import type { Categorytype, SortOptionType } from '../types/movieTypes';

export const INITIAL_CATEGORY: Categorytype = {
  name: 'All',
};

export const SORT_OPTIONS: SortOptionType[] = [
  { name: 'Year(asc)', sortBy: 'primary_release_date.desc' },
  { name: 'Year(desc)', sortBy: 'primary_release_date.asc' },

  { name: 'Rating(asc)', sortBy: 'vote_average.asc' },
  { name: 'Rating(desc)', sortBy: 'vote_average.desc' },

  { name: 'Popularity(asc)', sortBy: 'popularity.asc' },
  { name: 'Popularity(desc)', sortBy: 'popularity.desc' },
];
