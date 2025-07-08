'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import type { Categorytype } from '@/types/movieTypes';
import { CATEGORY_OPTIONS, INITIAL_CATEGORY } from '@/constants/movieConstants';
import { memo } from 'react';

const Categories: React.FC<{
  selectedCategory: Categorytype;
  setSelectedCategory: (newSelectedCategory: Categorytype) => void;
}> = ({ selectedCategory, setSelectedCategory }) => {
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
      {[INITIAL_CATEGORY, ...CATEGORY_OPTIONS].map((category) => (
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
