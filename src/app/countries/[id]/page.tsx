import 'server-only';
import type { Metadata } from 'next';
import CustomStack from '@/components/CustomStack';
import { Suspense } from 'react';
import PageLoader from '@/components/PageLoader';
import { getCountryById } from '@/api/CountriesAPI';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return {
    title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? 'WebDev'} | Country: ${params.id}`,
  };
}

type CountryPageProps = { params: { id: string }; searchParams?: { [key: string]: string | string[] | undefined } };

export default async function CountryPage({ params, searchParams }: CountryPageProps) {
  const countryFromServer = await getCountryById(Number(params.id));

  return (
    <CustomStack>
      <Suspense fallback={<PageLoader size='xl' text='Loading country...' />}>
        <Suspense fallback={<div>Loading...</div>}>
          <div>Country</div>
          <div>{countryFromServer?.name}</div>
        </Suspense>
      </Suspense>
    </CustomStack>
  );
}
