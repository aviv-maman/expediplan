import 'server-only';
import { metadata as mainMetadata } from '@/app/layout';

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? mainMetadata.title} | Help`,
};

const Help = () => {
  return <div>Help</div>;
};

export default Help;
