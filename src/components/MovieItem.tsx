import Link from 'next/link';
import React from 'react';

import { getImagePath } from '@/helpers/getImagePath';
import type { MovieData } from '@/types/movieTypes';
import { formatSmartDate } from '@/helpers/formatDate';
import { truncateText } from '@/helpers/truncateText';
import { getMovieDetailRoute } from '@/constants/routes';
import Image from 'next/image';

const MovieItem: React.FC<MovieData> = ({
  id,
  release_date,
  title,
  poster_path,
}) => {
  return (
    <article className="relative basis-[200px] shrink-0 gap-[1px] flex flex-col  ">
      <Link
        href={getMovieDetailRoute(id)}
        className="inline-block overflow-hidden rounded-[10px]"
      >
        <Image
          width={400}
          height={250}
          alt="Movie poster"
          className="block w-full h-[250px] duration-300 hover:scale-[1.1] object-cover "
          src={getImagePath(poster_path)}
        />
      </Link>
      <h3 className="text-[18px] font-medium grow">
        {truncateText(title, 40)}
      </h3>
      <p className="text-[16px]">{formatSmartDate(release_date)}</p>
    </article>
  );
};

export default MovieItem;
