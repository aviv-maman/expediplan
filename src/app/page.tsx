import 'server-only';
import CustomStack from '@/components/CustomStack';
import Features from '@/components/home/Features/Features';
import Hero from '@/components/home/Hero';
import CarouselCities from '@/components/home/CarouselCities';

// const getCurrentTime = async (): Promise<string> => {
//   const res = await fetch('https://worldtimeapi.org/api/timezone/America/Chicago', {
//     cache: 'no-store',
//   });
//   const data = await res.json();
//   return data.datetime;
// };

export default async function Home() {
  return (
    <CustomStack>
      <Hero />
      <Features />
      <CarouselCities />
    </CustomStack>
  );
}
