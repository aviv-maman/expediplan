import 'server-only';
import type { Metadata } from 'next';
import { getPlanByIdFromServer } from '@/api/PlansAPI';
import { getCityById } from '@/api/CitiesAPI';
import CustomStack from '@/components/CustomStack';
import HeroBlock from '@/components/plans/HeroBlock';
import DayTimeline from '@/components/plans/DayTimeline';
import { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import HeroBlock2 from '@/components/plans/HeroBlock2';

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
  const session = await getServerSession();
  const planFromServer = await getPlanByIdFromServer(params.id);
  const city = await getCityById(Number(planFromServer?.city));
  if (!planFromServer || !city) return <div>Plan or city not found</div>;

  return (
    <CustomStack>
      {session?.user?.email ? (
        <Suspense fallback={<div>Loading plan...</div>}>
          <HeroBlock
            coverImage={city.cover_image}
            cityName={city.name}
            planName={planFromServer.name}
            startDate={planFromServer.startDate}
            endDate={planFromServer.endDate}
            duration={planFromServer.duration}
          />
          <CustomStack>
            <DayTimeline planFromServer={planFromServer} />
          </CustomStack>
        </Suspense>
      ) : (
        <Suspense fallback={<div>Loading plan...</div>}>
          <HeroBlock2 id={params.id} />
          <CustomStack>
            <DayTimeline idFromLocalStorage={params.id} />
          </CustomStack>
        </Suspense>
      )}
    </CustomStack>
  );
}
