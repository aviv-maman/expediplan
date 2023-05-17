import 'server-only';
import type { Metadata } from 'next';
import CustomStack from '@/components/CustomStack';
import { Suspense } from 'react';
import { Subgrid } from '@/components/attraction/Subgrid/Subgrid';
import { getAttractionById } from '@/api/AttractionsAPI';
import Loading from '@/components/attraction/Subgrid/loading';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return {
    title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? ''} | Attraction: ${params.id}`,
  };
}

type AttractionPageProps = { params: { id: string }; searchParams?: { [key: string]: string | string[] | undefined } };

export default async function AttractionPage({ params, searchParams }: AttractionPageProps) {
  const attraction = await getAttractionById(Number(params.id));
  const serializedAttraction = JSON.stringify(attraction);

  return (
    <CustomStack align='center'>
      <Suspense fallback={<Loading />}>
        <Subgrid attraction={serializedAttraction} />
      </Suspense>
    </CustomStack>
  );
}
