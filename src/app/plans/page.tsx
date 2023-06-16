import 'server-only';
import { metadata as mainMetadata } from '@/app/layout';
import { TableSort } from '@/components/plans/TableSort';
import CustomStack from '@/components/CustomStack';
import { Suspense } from 'react';
import PageLoader from '@/components/PageLoader';

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? mainMetadata.title} | Plans`,
};

const Plans: React.FC = () => {
  return (
    <CustomStack>
      <Suspense fallback={<PageLoader />}>
        <TableSort />
      </Suspense>
    </CustomStack>
  );
};

export default Plans;
