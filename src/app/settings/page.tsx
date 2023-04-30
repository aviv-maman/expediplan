import 'server-only';
import { metadata as mainMetadata } from '@/app/layout';
import CustomStack from '@/components/CustomStack';
import { SettingsCard } from '@/components/settings/SettingsCard';
import { UserInfoCard } from '@/components/settings/UserInfoCard';
import CustomContainer from '@/components/CustomContainer';

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? mainMetadata.title} | Settings`,
};

const Settings: React.FC = () => {
  return (
    <CustomStack>
      <CustomContainer mt={'xs'}>
        <UserInfoCard />
        <SettingsCard />
      </CustomContainer>
    </CustomStack>
  );
};

export default Settings;
