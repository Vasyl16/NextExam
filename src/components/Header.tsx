'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useClickAway } from 'react-use';

import { StarRating } from './StarRating';

import { useTheme } from '@/context/theme/useTheme';
import { truncateText } from '@/helpers/truncateText';
import { useGetSearchMovies } from '@/api/query/useGetSearchMovies';
import { getImagePath } from '@/helpers/getImagePath';
import { useDebounce } from '@/hooks/useDebounce';

import { BASE_URL, getMovieDetailRoute, ROUTES } from '@/constants/routes';

import { SearchMovieType } from '@/types/movieTypes';

type SearchItemsListProps = {
  isLoadingSearchMovies: boolean;
  searchMovies: SearchMovieType[];
  seartchTextDebounce: string;
  handleNavigateMovie: (id: number) => void;
  parentRef: React.RefObject<HTMLDivElement | null>;
  handleClearState: () => void;
};

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const [searchText, setSearchText] = useState('');

  const router = useRouter();

  const searchInputAndItems = useRef<HTMLDivElement>(null);

  const { debounceValue: seartchTextDebounce } =
    useDebounce<string>(searchText);

  const { data: searchMovies = [], isLoading: isLoadingSearchMovies } =
    useGetSearchMovies(
      seartchTextDebounce,
      seartchTextDebounce.trim().length > 0
    );

  const handleClearState = () => {
    setSearchText('');
  };

  const handleNavigateMovie = (id: number) => {
    setSearchText('');

    router.push(getMovieDetailRoute(id));
  };

  const handleClickHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === ROUTES.HOME) {
      e.preventDefault(); // Prevent navigation if already on home
    }
  };

  return (
    <header className="bg-main-bg shadow-main transition-theme top-0 sticky z-10">
      <div className="flex justify-between items-center gap-[20px] p-[20px] min-h-[90px] ">
        <div>
          <Link
            href={ROUTES.HOME}
            className="font-logo text-main-text text-[30px]"
            onClick={handleClickHome}
          >
            Movie.okten
          </Link>
        </div>

        <div
          ref={searchInputAndItems}
          className="relative flex-1 max-w-[500px]"
        >
          <div className="relative">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="text-[18px] bg-input-bg text-input-text w-full rounded-[10px] p-[10px_40px_10px_10px]  shadow-[-30px_-10px_70px_rgba(0,0,0,0.1)] focus:outline-input-outline"
              placeholder="Type to search movie"
            />

            {searchText && (
              <button
                onClick={handleClearState}
                className="h-[30px] w-[30px] cursor-pointer absolute top-[50%] right-[10px] -translate-y-[50%]"
              >
                <svg className=" hover:opacity-70  h-full w-full">
                  <use href={`${BASE_URL}/icons/sprite.svg#cross-icon`}></use>
                </svg>
              </button>
            )}
          </div>

          {searchText && (
            <SearchItemsList
              parentRef={searchInputAndItems}
              handleClearState={handleClearState}
              isLoadingSearchMovies={isLoadingSearchMovies}
              searchMovies={searchMovies}
              seartchTextDebounce={seartchTextDebounce}
              handleNavigateMovie={handleNavigateMovie}
            />
          )}
        </div>

        <div className="flex gap-[20px] items-center">
          <div className="items-center flex">
            <button
              className={`
                ease-in-out
                shadow-[inset_0px_5px_15px_rgba(0,0,0,0.4),inset_0px_-5px_15px_rgba(255,255,255,0.4)]
                cursor-pointer w-[110px] h-[46px] relative  rounded-[15px]
                after:content-[''] after:absolute after:top-[3px] after:w-[40px] after:h-[40px] after:rounded-[50%]
                after:transition-all  after:duration-[0.5s]  after:ease-in-out after:shadow-[0_5px_10px_rgba(0,0,0,0.2)]
                ${
                  theme === 'light'
                    ? 'after:left-[3px] after:bg-[linear-gradient(180deg,#ffcc89,#d8860b)] bg-white'
                    : 'after:left-[67px] after:bg-[#3d3d3d] bg-[#dedede]'
                }
              `}
              onClick={() => {
                toggleTheme();
              }}
            ></button>
          </div>

          <div>
            <button
              className={`
                transition-theme
            flex cursor-pointer items-center gap-[10px] border-input-border rounded-full  shadow-[0px_5px_25px_-10px_rgba(0,0,0,0.4)] p-[0_15px_0_0px]
             ${!(theme === 'light') && 'bg-[#3d3d3d]'}`}
            >
              <Image
                width={46}
                height={46}
                alt="avatar"
                className="h-[46px] w-[46px] rounded-full"
                src={`${BASE_URL}/img/header/header-avatar.png`}
              />
              <p className="text-[16px] text-main-text font-semibold">Vasyl </p>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const SearchItemsList: React.FC<SearchItemsListProps> = ({
  parentRef,
  handleClearState,
  isLoadingSearchMovies,
  searchMovies,
  seartchTextDebounce,
  handleNavigateMovie,
}) => {
  useClickAway(parentRef, () => {
    handleClearState();
  });

  return (
    <div
      className={`
    absolute
    duration-300
    delay-200
    ease-in-out
    h-[50vh]
    custom-scrollbar
    overflow-y-scroll
    w-full
    top-[calc(100%+10px)]
    left-0
    rounded-[10px]
    shadow
    bg-dropdown-bg
    border
    border-dropdown-border
    opacity-0
    translate-y-5
    animate-fadeSlideIn`}
    >
      {isLoadingSearchMovies ? (
        <svg className="h-[30px] w-[30px] object-cover m-[20px_auto_0] spin-endless stroke-main-text duration-500 ">
          <use href={`${BASE_URL}/icons/sprite.svg#loader-icon`}></use>
        </svg>
      ) : searchMovies.length === 0 ? (
        <p className="text-center text-[20px] mt-[20px]">
          {seartchTextDebounce && 'Noting is found'}
        </p>
      ) : (
        searchMovies.map((searchMovie, i) => (
          <button
            onClick={() => handleNavigateMovie(searchMovie.id)}
            key={i}
            className="block w-full px-4 py-2 duration-300 hover:bg-dropdown-list-bg cursor-pointer"
          >
            <article className="flex gap-[20px]">
              <Image
                width={70}
                height={90}
                alt={searchMovie.title}
                src={getImagePath(searchMovie.poster_path)}
                className="h-[90px] w-[70px] object-cover rounded-[8px]"
              />

              <div className="flex items-start flex-col gap-[3px] ">
                <h3 className="text-left text-[18px] text-main-text ">
                  {searchMovie.title}
                </h3>

                <p className="text-[15px] text-left text-main-text ">
                  {truncateText(searchMovie.overview, 50)}
                </p>

                <StarRating rating={searchMovie.vote_average} />
              </div>
            </article>
          </button>
        ))
      )}
    </div>
  );
};
