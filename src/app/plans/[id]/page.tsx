import 'server-only';
import type { Metadata } from 'next';
import { getPlanByIdFromServer } from '@/api/PlansAPI';
import { getCityById } from '@/api/CitiesAPI';
import CustomStack from '@/components/CustomStack';
import HeroBlock from '@/components/plans/hero/HeroBlock';
import DayTimeline from '@/components/plans/DayTimeline';
import { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import PageLoader from '@/components/PageLoader';
import HeroLoading from '@/components/plans/hero/loading';
import { WeatherCard } from '@/components/plans/WeatherCard/WeatherCard';
import WeatherCardLoading from '@/components/plans/WeatherCard/loading';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return {
    title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? ''} | Plan: ${params.id}`,
  };
}

type PlanPageProps = { params: { id: string }; searchParams?: { [key: string]: string | string[] | undefined } };

export default async function PlanPage({ params, searchParams }: PlanPageProps) {
  const session = await getServerSession(authOptions);
  const planFromServer = session?.user?.id ? await getPlanByIdFromServer(Number(params.id)) : undefined;
  const cityFromServer = session?.user?.id ? await getCityById(Number(planFromServer?.city)) : undefined;

  if (session?.user?.id && planFromServer && !cityFromServer) return <div>Plan or city not found</div>;

  return (
    <CustomStack mx={{ xl: '20%' }}>
      <Suspense fallback={<PageLoader size='xl' text='Loading plan...' />}>
        {/* planId = Plan ID from server (authenticated user) or local storage (guest user) */}
        <Suspense fallback={<HeroLoading />}>
          <HeroBlock planId={params.id} />
        </Suspense>
        <CustomStack mx={{ xl: '25%', lg: '25%' }}>
          <Suspense fallback={<WeatherCardLoading />}>
            <WeatherCard planId={params.id} />
          </Suspense>
          <DayTimeline planId={params.id} />
        </CustomStack>
      </Suspense>
    </CustomStack>
  );
}
