import React from 'react';

import MovieItem from './MovieItem';

import type { MovieData } from '@/types/movieTypes';

export const MovieListSection: React.FC<{ movieData: MovieData[] }> = ({
  movieData,
}) => {
  return (
    <div className="flex gap-[20px] justify-center flex-wrap">
      {movieData.map((movieItem) => (
        <MovieItem key={movieItem.id} {...movieItem} />
      ))}
    </div>
  );
};
