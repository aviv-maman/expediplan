import 'server-only';
import type { Metadata } from 'next';
import CustomStack from '@/components/CustomStack';
import { Suspense } from 'react';

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
  return (
    <CustomStack mx={{ xl: '20%' }}>
      <Suspense></Suspense>
    </CustomStack>
  );
}
