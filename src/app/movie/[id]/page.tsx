import React from 'react';

import { ROUTES } from '@/constants/routes';
import { getImagePath } from '@/helpers/getImagePath';
import { getMovieFull } from '@/api/services/getMovieFull';
import Image from 'next/image';
import Link from 'next/link';
import { StarRating } from '@/components/StarRating';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const movieData = await getMovieFull(id);

  if (!movieData) {
    throw new Error();
  }

  return (
    <main className="py-[30px] my-[20px] ">
      <div className="container">
        <h1 className="text-[30px] text-center">{movieData.title} </h1>

        <div className="flex gap-[20px] mt-[30px] max-h-[700px] justify-center">
          <Image
            alt="Movie Poster"
            width="400"
            height="400"
            className="w-[40%] object-cover rounded-[20px] "
            src={getImagePath(movieData.poster_path)}
          />
          <div className="flex flex-col gap-[30px]  ">
            <ul className="flex flex-col gap-[20px] ">
              <li className="flex items-end  gap-[8px] ">
                <span className="text-[18px] ">Rating:</span>

                <div className="mb-[2px]">
                  <StarRating rating={Number(movieData.vote_average)} />
                </div>
              </li>

              <li className="flex items-end text-[18px]  gap-[8px] ">
                Vote Count: {movieData.vote_count}
              </li>

              <li className="text-[18px] flex gap-[15px] items-center ">
                Genres:
                <ul className="flex gap-[10px]">
                  {movieData.genres.map((genre) => (
                    <li
                      className="text-white font-semibold bg-main-button-bg py-[6px] px-[10px] rounded-[7px]"
                      key={genre.id}
                    >
                      {genre.name}{' '}
                    </li>
                  ))}
                </ul>
              </li>

              <li className="text-[18px] flex gap-[15px] items-center">
                Product country:{' '}
                <ul className="flex gap-[10px]">
                  {movieData.production_countries.map((country, i) => (
                    <li key={i}>
                      {country.name}
                      {i + 1 !== movieData.production_countries.length &&
                        ','}{' '}
                    </li>
                  ))}
                </ul>{' '}
              </li>

              <li className="text-[18px] flex gap-[15px] items-start">
                <span className="shrink-0"> Product companies:</span>
                <ul className="flex flex-wrap gap-[10px]">
                  {movieData.production_companies.map((company, i) => (
                    <li
                      className="flex gap-[10px] items-center "
                      key={company.id}
                    >
                      <span>{company.name}</span>{' '}
                      {company.logo_path && (
                        <Image
                          alt="company logo"
                          height={20}
                          width={20}
                          className="w-[20px] h-[20px] object-fill"
                          src={getImagePath(company.logo_path)}
                        />
                      )}
                      <span>{company.origin_country}</span>
                      {i + 1 !== movieData.production_companies.length &&
                        ','}{' '}
                    </li>
                  ))}
                </ul>
              </li>
              <li className="text-[18px] flex gap-[15px] items-start">
                {movieData.overview}
              </li>
            </ul>

            <Link
              href={ROUTES.HOME}
              className="text-white  cursor-pointer self-start hover:opacity-50 duration-300 text-[20px] font-semibold bg-main-button-bg py-[6px] px-[10px] rounded-[7px]"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
