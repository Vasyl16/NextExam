import React from 'react';

import { getNewestMovies } from '@/api/services/getNewestMovies';
import { HeroItems } from './HeroItems';

export const Hero: React.FC = async () => {
  const data = await getNewestMovies();

  if (data.length === 0) {
    return (
      <section className="w-full h-[calc(100svh-90px)] flex items-center justify-center bg-gray-200">
        <p className="text-gray-600 text-xl">No movies found.</p>
      </section>
    );
  }

  return (
    <section className="w-full h-[calc(100svh-90px)]">
      <HeroItems data={data} />
    </section>
  );
};
