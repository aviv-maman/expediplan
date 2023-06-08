import 'server-only';
import type { Metadata } from 'next';
import CustomStack from '@/components/CustomStack';
import { Suspense } from 'react';
import { getCityById } from '@/api/CitiesAPI';
import LeadGrid from '@/components/city/LeadGrid';
import HeroCity from '@/components/city/HeroCity';
import DetailsCity from '@/components/city/DetailsCity/DetailsCity';
import Loading from '@/components/city/DetailsCity/loading';
import WeatherWidget from '@/components/city/Weather/WeatherWidget';
import WeatherWidgetLoading from '@/components/city/Weather/loading';
import { cookies } from 'next/headers';
import LeafletMap from '@/components/map/LeafletMap';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return {
    title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? ''} | City: ${params.id}`,
  };
}

type CityPageProps = { params: { id: string }; searchParams?: { [key: string]: string | string[] | undefined } };

export default async function CityPage({ params, searchParams }: CityPageProps) {
  const cityFromServer = await getCityById(Number(params.id));
  const cookieStore = cookies();
  const temperatureUnit = cookieStore.get('temperature-unit')?.value === 'f' ? 'f' : 'c';

  return (
    <CustomStack mx={{ xl: '20%' }}>
      <Suspense>
        <HeroCity city={cityFromServer} />
      </Suspense>
      <LeafletMap latitude={Number(cityFromServer?.latitude)} longitude={Number(cityFromServer?.longitude)} />
      <Suspense fallback={<WeatherWidgetLoading />}>
        <WeatherWidget city={cityFromServer} temperatureUnit={temperatureUnit} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <DetailsCity city={cityFromServer} />
      </Suspense>
      <Suspense>
        <LeadGrid city={cityFromServer} />
      </Suspense>
    </CustomStack>
  );
}
