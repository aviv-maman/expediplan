import 'server-only';
import { metadata as mainMetadata } from '@/app/layout';
import CustomStack from '@/components/CustomStack';
import { HelpSection } from '@/components/help/HelpSection';

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? mainMetadata.title} | Help`,
};

const Help = () => {
  return (
    <CustomStack>
      <HelpSection />
    </CustomStack>
  );
};

export default Help;
