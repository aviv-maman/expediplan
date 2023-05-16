import 'server-only';
import type { Metadata } from 'next';
import CustomStack from '@/components/CustomStack';
import { Suspense } from 'react';
import PageLoader from '@/components/PageLoader';
import { getCountryById } from '@/api/CountriesAPI';
import HeroCountry from '@/components/country/HeroCountry';
import InfoCountry from '@/components/country/InfoCountry';
import { getCitiesByCountryId } from '@/api/CitiesAPI';
import CarouselXL from '@/components/city/CarouselXL';
import HeroSkeleton from '@/components/city/HeroSkeleton';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return {
    title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? ''} | Country: ${params.id}`,
  };
}

type CountryPageProps = { params: { id: string }; searchParams?: { [key: string]: string | string[] | undefined } };

export default async function CountryPage({ params, searchParams }: CountryPageProps) {
  const countryFromServer = await getCountryById(Number(params.id));
  const citiesFromServer = await getCitiesByCountryId(Number(params.id));

  return (
    <CustomStack mx={{ xl: '20%' }}>
      <Suspense fallback={<PageLoader size='xl' text='Loading country...' />}>
        <Suspense fallback={<HeroSkeleton />}>
          <HeroCountry countryFromServer={countryFromServer} />
        </Suspense>
        <Suspense fallback={<div>Loading info...</div>}>
          <InfoCountry countryFromServer={countryFromServer} />
        </Suspense>
        <Suspense fallback={<div>Loading destinations...</div>}>
          <CarouselXL data={citiesFromServer} title={`Popular Destinations in ${countryFromServer?.name}`} />
        </Suspense>
      </Suspense>
    </CustomStack>
  );
}
