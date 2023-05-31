import 'server-only';
import CustomStack from '@/components/CustomStack';
import Features from '@/components/home/Features/Features';
import Hero from '@/components/home/Hero';
import CarouselCities from '@/components/home/CarouselCities';
import { Suspense } from 'react';
import Loading from '@/components/country/CarouselCountry/loading';
import { POPULAR_DESTINATIONS } from '@/lib/constants';

export default async function Home() {
  return (
    <CustomStack>
      <Hero />
      <Features />
      <Suspense fallback={<Loading />}>
        <CarouselCities title='Popular Destinations' idsToFetch={POPULAR_DESTINATIONS} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <CarouselCities title='All Destinations' sortByName />
      </Suspense>
    </CustomStack>
  );
}
