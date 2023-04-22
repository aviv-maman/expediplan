import 'server-only';
import { metadata as mainMetadata } from '@/app/layout';

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? mainMetadata.title} | Settings`,
};

const Settings: React.FC = () => {
  return <div>Settings</div>;
};

export default Settings;
