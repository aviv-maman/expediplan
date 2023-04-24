import 'server-only';
import { metadata as mainMetadata } from '@/app/layout';
import { TableSort } from '@/components/plans/TableSort';
import CustomStack from '@/components/CustomStack';

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? mainMetadata.title} | Plans`,
};

const Plans: React.FC = () => {
  return (
    <CustomStack>
      <TableSort />
    </CustomStack>
  );
};

export default Plans;
