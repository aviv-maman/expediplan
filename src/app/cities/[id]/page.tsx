import 'server-only';
import type { Metadata } from 'next';
import CustomStack from '@/components/CustomStack';
import { Suspense } from 'react';
import PageLoader from '@/components/PageLoader';
import { getCityById } from '@/api/CitiesAPI';
import LeadGrid from '@/components/city/LeadGrid';
import HeroCity from '@/components/city/HeroCity';
import HeroSkeleton from '@/components/city/HeroSkeleton';
import DetailsCity from '@/components/city/DetailsCity';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return {
    title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? 'WebDev'} | City: ${params.id}`,
  };
}

type CityPageProps = { params: { id: string }; searchParams?: { [key: string]: string | string[] | undefined } };

export default async function CityPage({ params, searchParams }: CityPageProps) {
  const cityFromServer = await getCityById(Number(params.id));

  return (
    <CustomStack mx={{ xl: '20%' }}>
      <Suspense fallback={<PageLoader size='xl' text='Loading city...' />}>
        <Suspense fallback={<HeroSkeleton />}>
          <HeroCity />
        </Suspense>
        <DetailsCity city={cityFromServer} />
        <Suspense fallback={<LeadGrid skeleton />}>
          <LeadGrid city={cityFromServer} />
        </Suspense>
      </Suspense>
    </CustomStack>
  );
}
