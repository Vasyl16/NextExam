'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import { useGetGenres } from '@/api/query/useGetGenres';

import type { Categorytype } from '@/types/movieTypes';
import { SkeletonComp } from './SkeletonComp';
import { INITIAL_CATEGORY } from '@/constants/movieConstants';
import { memo } from 'react';

const Categories: React.FC<{
  selectedCategory: Categorytype;
  setSelectedCategory: (newSelectedCategory: Categorytype) => void;
}> = ({ selectedCategory, setSelectedCategory }) => {
  const {
    data: categoryData,
    isLoading: isLoadingGenres,
    error,
  } = useGetGenres();

  if (isLoadingGenres) {
    return (
      <div className="flex gap-[10px]">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonComp key={i} width="100px" height="42px" rounded="10px" />
        ))}
      </div>
    );
  }

  if (error || !categoryData) {
    return <div>Can&apost Load Categories</div>;
  }

  return (
    <Swiper
      tag="ul"
      role="tablist"
      spaceBetween={10}
      slidesPerView={'auto'}
      freeMode={true}
      onClick={() => {
        document.body.dispatchEvent(
          new MouseEvent('mousedown', { bubbles: true })
        );
      }}
    >
      {[INITIAL_CATEGORY, ...categoryData].map((category) => (
        <SwiperSlide
          key={category.id || category.name}
          tag="li"
          role="tab"
          tabIndex={category.id == selectedCategory.id ? -1 : 0}
          aria-selected={category.id === selectedCategory.id}
          onClick={() => setSelectedCategory(category)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setSelectedCategory(category);
            }
          }}
          className={`
            my-[15px_!important]
          !w-auto min-w-[80px] text-center opacity-50 cursor-pointer hover:opacity-70 select-none text-[20px] text-white font-semibold bg-main-button-bg py-[6px] px-[10px] rounded-[7px] 
          ${
            category.id === selectedCategory.id &&
            'opacity-100 pointer-events-none '
          } `}
        >
          {category.name}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default memo(Categories);
