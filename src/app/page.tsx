import 'server-only';
import CustomStack from '@/components/home/CustomStack';
import Features from '@/components/home/Features/Features';
import Hero from '@/components/home/Hero';
import CarouselCities from '@/components/home/CarouselCities';

async function getCities(): Promise<any> {
  const env = process.env.NODE_ENV;
  const hostname = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_HOSTNAME;
  // const params = new URLSearchParams({ id: ['1,2,77340,143446'] });
  const ids = ['77340', '143446', '59582', '44856', '50388', '99972'];
  const params = new URLSearchParams({ id: String(ids) });
  const res = await fetch(`${hostname}/api/cities?${params}`, {
    cache: 'default',
  });
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  if (data.message) {
    throw new Error(data.message);
  }
  return Object.values(data);
}

// const getCurrentTime = async (): Promise<string> => {
//   const res = await fetch('https://worldtimeapi.org/api/timezone/America/Chicago', {
//     cache: 'no-store',
//   });
//   const data = await res.json();
//   return data.datetime;
// };

export default async function Home() {
  const [cities] = await Promise.all([getCities()]);

  return (
    <CustomStack>
      <Hero />
      <Features />
      <CarouselCities />
      {JSON.stringify(cities)}
    </CustomStack>
  );
}
