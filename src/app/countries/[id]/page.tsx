import 'server-only';
import type { Metadata } from 'next';
import CustomStack from '@/components/CustomStack';
import { Suspense } from 'react';
import { getCountryById } from '@/api/CountriesAPI';
import HeroCountry from '@/components/country/HeroCountry';
import InfoCountry from '@/components/country/InfoCountry';
import CarouselCountry from '@/components/country/CarouselCountry/CarouselCountry';
import Loading from '@/components/country/CarouselCountry/loading';

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

  return (
    <CustomStack mx={{ xl: '20%' }}>
      <Suspense>
        <HeroCountry country={countryFromServer} />
        <InfoCountry country={countryFromServer} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <CarouselCountry />
      </Suspense>
    </CustomStack>
  );
}
