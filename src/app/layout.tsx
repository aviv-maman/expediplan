import './globals.css';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import RootStyleRegistry from './emotion';
import GlobalAppShell from '@/layout/GlobalAppShell';
import GlobalRecoilRoot from '@/layout/GlobalRecoilRoot';

export const metadata = {
  title: 'ExpediPlan',
  description: 'Generated by create next app',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const colorScheme = cookieStore.get('color-scheme')?.value === 'dark' ? 'dark' : 'light';

  return (
    <html lang='en'>
      <body className={inter.className}>
        <GlobalRecoilRoot>
          <RootStyleRegistry themeColor={colorScheme}>
            <GlobalAppShell>{children}</GlobalAppShell>
          </RootStyleRegistry>
        </GlobalRecoilRoot>
      </body>
    </html>
  );
}
