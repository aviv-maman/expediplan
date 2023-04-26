import 'server-only';
import type { Metadata } from 'next';
import CustomContainer from '@/components/CustomContainer';
import { getPlanById } from '@/api/PlansAPI';

type Props = {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return {
    title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? 'WebDev'} | Repository: ${params.name}`,
  };
}

type PlanPageProps = { params: { id: string }; searchParams?: { [key: string]: string | string[] | undefined } };

export default async function PlanPage({ params, searchParams }: PlanPageProps) {
  const plan = await getPlanById(params.id);

  return (
    <CustomContainer>
      <div>
        <h1>{plan.name}</h1>
        <p>{plan.countryName}</p>
      </div>
    </CustomContainer>
  );
}
