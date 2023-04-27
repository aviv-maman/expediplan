import 'server-only';
import type { Metadata } from 'next';
import { getPlanById } from '@/api/PlansAPI';
import { getCityById } from '@/api/CitiesAPI';
import CustomStack from '@/components/CustomStack';
import HeroBlock from '@/components/plans/HeroBlock';
import DayTimeline from '@/components/plans/DayTimeline';
import { Suspense } from 'react';
import AttractionTimeline from '@/components/plans/AttractionTimeline';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return {
    title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? 'WebDev'} | Repository: ${params.id}`,
  };
}

type PlanPageProps = { params: { id: string }; searchParams?: { [key: string]: string | string[] | undefined } };

export default async function PlanPage({ params, searchParams }: PlanPageProps) {
  const planFromServer = await getPlanById(params.id);
  const city = await getCityById(59582);
  if (!planFromServer || !city) return <div>Plan or city not found</div>;

  return (
    <CustomStack>
      <Suspense fallback={<div>Loading plan...</div>}>
        <HeroBlock
          coverImage={city.cover_image}
          cityName={city.name}
          planName={planFromServer.name}
          startDate={planFromServer.startDate}
          endDate={planFromServer.endDate}
        />
        <CustomStack>
          {JSON.stringify(planFromServer?.days)}
          {planFromServer?.days?.length}
          <DayTimeline items={planFromServer?.days} startDate={planFromServer?.startDate} endDate={planFromServer?.endDate} />
          {/* <AttractionTimeline items={planFromServer?.days} /> */}
        </CustomStack>
      </Suspense>
    </CustomStack>
  );
}
