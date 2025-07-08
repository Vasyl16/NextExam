'use client';

import { useSelector } from 'react-redux';
import React, { useEffect, useMemo } from 'react';

import 'swiper/swiper-bundle.css';

import Categories from './Categories';
import { MovieListSection } from './MovieListSection';
import { PaginationComp } from './Pagination';
import { SortDropdown } from './SortDropdown';
import { SkeletonComp } from './SkeletonComp';

import { useAppDispatch } from '@/store/store';
import { fetchMovies } from '@/store/slices/movieSlice';
import { selectMovieState } from '@/store/slices/select';

import { useSearchParamsMovies } from '@/hooks/useSearchParamsMovies';

export const Movie: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    currentPage,
    handleSetCurrentPage,
    handleSetGategory,
    handleSetSelectedSort,
    selectedCategory,
    selectedSort,
  } = useSearchParamsMovies();

  const movieOptions = useMemo(() => {
    return {
      page: currentPage,
      genreId: selectedCategory?.id,
      sortBy: selectedSort.sortBy,
    };
  }, [currentPage, selectedCategory, selectedSort]);

  useEffect(() => {
    dispatch(fetchMovies(movieOptions));
  }, [dispatch, movieOptions]);

  const movieItems = useSelector(selectMovieState);

  return (
    <section className="py-[30px] my-[30px] mt-[20px]">
      <div className="container">
        <h1 className="text-center text-[36px]">Movie List</h1>

        <div className="relative flex my-[30px] items-center gap-[30px]">
          <SortDropdown
            selected={selectedSort}
            setSelected={handleSetSelectedSort}
          />

          <div className="flex-1 overflow-x-auto border-l-main-text border-l-2 pl-[20px]">
            <Categories
              selectedCategory={selectedCategory}
              setSelectedCategory={handleSetGategory}
            />
          </div>
        </div>

        {movieItems.status === 'loading' ? (
          <>
            <div className="flex gap-[20px] justify-center flex-wrap">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonComp
                  key={i}
                  width="200px"
                  height="300px"
                  rounded="10px"
                />
              ))}
            </div>

            <div className="flex justify-center mt-[40px] gap-[20px]">
              {Array.from({ length: 7 }).map((_, i) => (
                <SkeletonComp
                  key={i}
                  width="35px"
                  height="36px"
                  rounded="6px"
                />
              ))}
            </div>
          </>
        ) : movieItems.status === 'error' || movieItems.results.length == 0 ? (
          <>
            <p className="text-center text-[20px]">
              There is no movie can be found
            </p>
          </>
        ) : (
          <>
            <MovieListSection movieData={movieItems.results} />

            {movieItems.total_pages > 1 && (
              <div className="mt-[40px]">
                <PaginationComp
                  currentPage={currentPage}
                  setCurrentPage={handleSetCurrentPage}
                  totalPages={movieItems.total_pages}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
