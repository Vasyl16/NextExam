'use client';

import { useQuery } from '@tanstack/react-query';
import { getGenres } from '../services/getGenres';
import type { Categorytype } from '@/types/movieTypes';

export const useGetGenres = () => {
  return useQuery<Categorytype[]>({
    queryKey: ['genres'],
    queryFn: getGenres,
  });
};
