'use client';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/swiper-bundle.css';

import type { NewestMovieData } from '../types/movieTypes';
import { getImagePath } from '../helpers/getImagePath';
import { truncateText } from '../helpers/truncateText';
import { getMovieDetailRoute } from '../constants/routes';
import Link from 'next/link';
import Image from 'next/image';

export const HeroItems: React.FC<{ data: NewestMovieData[] }> = ({ data }) => {
  return (
    <Swiper
      onClick={() => {
        document.body.dispatchEvent(
          new MouseEvent('mousedown', { bubbles: true })
        );
      }}
      modules={[Autoplay]}
      className="w-full h-full"
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      speed={2000}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
    >
      {data.map((movie) => (
        <SwiperSlide key={movie.id}>
          <HeroItem {...movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

function HeroItem({ id, title, overview, poster_path }: NewestMovieData) {
  return (
    <div className="relative h-full after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-[-2] after:bg-black after:opacity-35">
      <div className="container  h-full ">
        <div className="w-full h-full flex flex-col items-start justify-center gap-[20px] max-w-[clamp(500px,50%,50%)]">
          <h2 className="text-white font-bold text-[40px]">{title}</h2>

          <p className="text-white text-[18px]">
            {truncateText(overview, 200)}
          </p>

          <Link
            href={getMovieDetailRoute(id)}
            className="block text-center uppercase font-bold text-[18px] min-w-[150px] hover:opacity-[0.8] cursor-pointer duration-500 hover:duration-500   text-main-button bg-main-button-bg py-[8px] px-[13px] text-white rounded-[10px] "
          >
            open
          </Link>
        </div>

        <Image
          alt="Movie poster"
          width={2000}
          height={1080}
          src={getImagePath(poster_path)}
          className="inset-0 w-full h-full z-[-3]  object-cover absolute"
        />
      </div>
    </div>
  );
}
