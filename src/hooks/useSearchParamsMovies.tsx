import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import {
  CATEGORY_OPTIONS,
  INITIAL_CATEGORY,
  INITIAL_SORT_OPTION,
  SORT_OPTIONS,
} from '@/constants/movieConstants';

import type { Categorytype, SortOptionType } from '@/types/movieTypes';

export const useSearchParamsMovies = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawSort = searchParams.get('sortBy') || '';
  const rawCategoryId = Number(searchParams.get('categoryId'));
  const rawPage = Number(searchParams.get('page'));

  const initialSort =
    SORT_OPTIONS.find((s) => s.sortBy === rawSort) || INITIAL_SORT_OPTION;

  const initialCategory =
    CATEGORY_OPTIONS.find((c) => c.id === rawCategoryId) || INITIAL_CATEGORY;

  const initialPage = rawPage > 0 && rawPage <= 500 ? rawPage : 1;

  const [selectedSort, setSelectedSort] = useState<SortOptionType>(initialSort);
  const [selectedCategory, setSelectedCategory] =
    useState<Categorytype>(initialCategory);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  // ✅ useEffect to clean invalid values from URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let changed = false;

    if (!SORT_OPTIONS.find((s) => s.sortBy === rawSort)) {
      params.delete('sortBy');
      changed = true;
    }

    if (!CATEGORY_OPTIONS.find((c) => c.id === rawCategoryId)) {
      params.delete('categoryId');
      changed = true;
    }

    if (!(rawPage > 0 && rawPage <= 500)) {
      params.delete('page');
      changed = true;
    }

    if (changed) {
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, router]);

  const handleSetSelectedSort = (newSelectedSort: SortOptionType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', newSelectedSort.sortBy);
    setSelectedSort(newSelectedSort);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleSetCurrentPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    setCurrentPage(newPage);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleSetGategory = (category: Categorytype) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('categoryId', String(category.id));
    setSelectedCategory(category);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return {
    selectedSort,
    selectedCategory,
    currentPage,
    handleSetCurrentPage,
    handleSetGategory,
    handleSetSelectedSort,
  };
};
