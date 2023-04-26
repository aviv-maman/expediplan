import 'server-only';
import type { Metadata } from 'next';
import { getPlanById } from '@/api/PlansAPI';
import { getCityById } from '@/api/CitiesAPI';
import CustomStack from '@/components/CustomStack';
import HeroBlock from '@/components/plans/HeroBlock';
import DayTimeline from '@/components/plans/DayTimeline';
import { Suspense } from 'react';

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
  const plan = await getPlanById(params.id);
  const city = await getCityById(59582);
  if (!plan || !city) return <div>Plan or city not found</div>;

  return (
    <CustomStack>
      <Suspense fallback={<div>Loading plan...</div>}>
        <HeroBlock coverImage={city.cover_image} cityName={city.name} planName={plan.name} startDate={plan.startDate} endDate={plan.endDate} />
        <CustomStack>
          <DayTimeline items={plan?.days} />
        </CustomStack>
      </Suspense>
    </CustomStack>
  );
}
