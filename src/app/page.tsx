import { Inter } from 'next/font/google';
import HelloBlock from '@/components/HelloBlock';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={inter.className}>
      <div className='grid'>
        <HelloBlock />
        <HelloBlock />
        <HelloBlock />
      </div>
    </main>
  );
}
