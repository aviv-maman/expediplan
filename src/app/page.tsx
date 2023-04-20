import CustomStack from '@/components/home/CustomStack';
import Features from '@/components/home/Features/Features';
import Hero from '@/components/home/Hero';

export default function Home() {
  return (
    <CustomStack>
      <Hero />
      <Features />
    </CustomStack>
  );
}
