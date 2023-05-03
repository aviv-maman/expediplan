import 'server-only';
import CustomStack from '@/components/CustomStack';
import Features from '@/components/home/Features/Features';
import Hero from '@/components/home/Hero';
import CarouselCities from '@/components/home/CarouselCities';

export default async function Home() {
  return (
    <CustomStack>
      <Hero />
      <Features />
      <CarouselCities />
    </CustomStack>
  );
}
