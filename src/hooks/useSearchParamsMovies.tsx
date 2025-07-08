import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import type { Categorytype, SortOptionType } from '@/types/movieTypes';

import {
  CATEGORY_OPTIONS,
  INITIAL_CATEGORY,
  INITIAL_SORT_OPTION,
  SORT_OPTIONS,
} from '@/constants/movieConstants';

export const useSearchParamsMovies = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const getSortType = () => {
    const sortBy = searchParams.get('sortBy') || '';

    if (!sortBy) {
      return INITIAL_SORT_OPTION;
    }

    const sortOption = SORT_OPTIONS.find(
      (sortOption) => sortOption.sortBy === sortBy
    );

    if (!sortOption) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('sortBy');
      router.replace(`?${params.toString()}`, { scroll: false });
      return INITIAL_SORT_OPTION;
    }

    return sortOption;
  };

  const getCategory = () => {
    const categoryId = searchParams.get('categoryId') || '';

    if (!categoryId) {
      return INITIAL_CATEGORY;
    }

    const selectedCategory = CATEGORY_OPTIONS.find(
      (category) => category.id === Number(categoryId)
    );

    if (!selectedCategory) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('categoryId');
      router.replace(`?${params.toString()}`, { scroll: false });
      return INITIAL_CATEGORY;
    }

    return selectedCategory;
  };

  const getCurrentPage = () => {
    const currentPage = Number(searchParams.get('page'));

    if (!currentPage) {
      return 1;
    }

    if (currentPage > 500) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('page');
      router.replace(`?${params.toString()}`, { scroll: false });
      return 1;
    }

    return currentPage;
  };

  const [selectedSort, setSelectedSort] = useState<SortOptionType>(getSortType);

  const [selectedCategory, setSelectedCategory] =
    useState<Categorytype>(getCategory);

  const [currentPage, setCurrentPage] = useState(getCurrentPage);

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
