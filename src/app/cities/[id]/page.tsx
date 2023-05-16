import 'server-only';
import type { Metadata } from 'next';
import CustomStack from '@/components/CustomStack';
import { Suspense } from 'react';
import { getCityById } from '@/api/CitiesAPI';
import LeadGrid from '@/components/city/LeadGrid';
import HeroCity from '@/components/city/HeroCity';
import DetailsCity from '@/components/city/DetailsCity/DetailsCity';
import Loading from '@/components/city/DetailsCity/loading';

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

  return (
    <CustomStack mx={{ xl: '20%' }}>
      <Suspense>
        <HeroCity city={cityFromServer} />
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
