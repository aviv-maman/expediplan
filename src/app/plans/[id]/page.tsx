import 'server-only';
import type { Metadata } from 'next';
import { getPlanByIdFromServer } from '@/api/PlansAPI';
import { getCityById } from '@/api/CitiesAPI';
import CustomStack from '@/components/CustomStack';
import HeroBlockAuthorised from '@/components/plans/HeroBlockAuthorised';
import DayTimeline from '@/components/plans/DayTimeline';
import { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import HeroBlockGuest from '@/components/plans/HeroBlockGuest';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return {
    title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? 'WebDev'} | Plan: ${params.id}`,
  };
}

type PlanPageProps = { params: { id: string }; searchParams?: { [key: string]: string | string[] | undefined } };

export default async function PlanPage({ params, searchParams }: PlanPageProps) {
  const session = await getServerSession();
  const planFromServer = session?.user && (await getPlanByIdFromServer(params.id));
  const cityFromServer = session?.user && (await getCityById(Number(planFromServer?.city)));
  if (session?.user && !cityFromServer) return <div>Plan or city not found</div>;

  return (
    <CustomStack>
      {session?.user?.email && planFromServer && cityFromServer ? (
        <Suspense fallback={<div>Loading plan...</div>}>
          <HeroBlockAuthorised
            coverImage={cityFromServer?.cover_image}
            cityName={cityFromServer?.name}
            planName={planFromServer?.name}
            startDate={planFromServer?.startDate}
            endDate={planFromServer?.endDate}
            duration={planFromServer?.duration}
          />
          <CustomStack>
            <DayTimeline planFromServer={planFromServer} />
          </CustomStack>
        </Suspense>
      ) : (
        <Suspense fallback={<div>Loading plan...</div>}>
          <HeroBlockGuest idFromLocalStorage={params.id} />
          <CustomStack>
            <DayTimeline idFromLocalStorage={params.id} />
          </CustomStack>
        </Suspense>
      )}
    </CustomStack>
  );
}
