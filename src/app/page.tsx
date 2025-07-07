import { Hero } from '@/components/Hero';
import { Movie } from '@/components/Movie';
import { SkeletonComp } from '@/components/SkeletonComp';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <main>
      <Suspense
        fallback={
          <section className="w-full h-[calc(100svh-90px)]">
            <SkeletonComp width="100%" height="100%" rounded="0" />
          </section>
        }
      >
        <Hero />
      </Suspense>
      <Movie />
    </main>
  );
}
