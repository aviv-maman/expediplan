import type { NextPage } from 'next';

import { metadata as mainMetadata } from '@/app/layout';

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? mainMetadata.title} | About`,
};

const About: NextPage = () => {
  return <div>Help</div>;
};

export default About;
