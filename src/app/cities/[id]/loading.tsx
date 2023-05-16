import CustomStack from '@/components/CustomStack';
import HeroSkeleton from '@/components/city/HeroSkeleton';
import PageLoaderWithHero from '@/components/PageLoaderWithHero';
import LeadGridSkeleton from '@/components/city/LeadGridSkeleton';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <CustomStack mx={{ xl: '20%' }}>
      <HeroSkeleton />
      <PageLoaderWithHero size='lg' text='Loading city...' />
      <LeadGridSkeleton />
    </CustomStack>
  );
}
