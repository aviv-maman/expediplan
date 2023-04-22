import 'server-only';
import { metadata as mainMetadata } from '@/app/layout';

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? mainMetadata.title} | Plans`,
};

const Plans: React.FC = () => {
  return <div>Plans</div>;
};

export default Plans;
