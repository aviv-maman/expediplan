import 'server-only';
import type { Metadata } from 'next';
import { getPlanByIdFromServer } from '@/api/PlansAPI';
import { getCityById } from '@/api/CitiesAPI';
import CustomStack from '@/components/CustomStack';
import HeroBlockAuthorised from '@/components/plans/hero/HeroBlockAuthorised';
import DayTimeline from '@/components/plans/DayTimeline';
import { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import HeroBlockGuest from '@/components/plans/hero/HeroBlockGuest';
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
  const planFromServer = session?.user?.id ? await getPlanByIdFromServer(params.id) : undefined;
  const cityFromServer = session?.user?.id ? await getCityById(Number(planFromServer?.city)) : undefined;

  if (session?.user?.id && planFromServer && !cityFromServer) return <div>Plan or city not found</div>;

  return (
    <CustomStack mx={{ xl: '20%' }}>
      <Suspense fallback={<PageLoader size='xl' text='Loading plan...' />}>
        {session?.user?.id && planFromServer && cityFromServer ? (
          <>
            <Suspense fallback={<HeroLoading />}>
              <HeroBlockAuthorised
                coverImage={cityFromServer?.cover_image}
                cityName={cityFromServer?.name}
                planName={planFromServer?.name}
                startDate={planFromServer?.startDate}
                endDate={planFromServer?.endDate}
                duration={planFromServer?.duration}
              />
            </Suspense>
            <CustomStack mx={{ xl: '25%', lg: '25%' }}>
              <DayTimeline planFromServer={planFromServer} />
            </CustomStack>
          </>
        ) : (
          <>
            <Suspense fallback={<HeroLoading />}>
              <HeroBlockGuest idFromLocalStorage={params.id} />
            </Suspense>
            <CustomStack mx={{ xl: '25%', lg: '25%' }}>
              <Suspense fallback={<WeatherCardLoading />}>
                <WeatherCard idFromLocalStorage={params.id} />
              </Suspense>
              <DayTimeline idFromLocalStorage={params.id} />
            </CustomStack>
          </>
        )}
      </Suspense>
    </CustomStack>
  );
}
