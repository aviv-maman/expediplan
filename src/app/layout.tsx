import './globals.css';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import RootStyleRegistry from './emotion';
import GlobalAppShell from '@/layout/GlobalAppShell';
import GlobalRecoilRoot from '@/layout/GlobalRecoilRoot';
import GlobalSessionProvider from '@/layout/GlobalSessionProvider';
import { getServerSession } from 'next-auth/next';

export const metadata = {
  title: 'ExpediPlan',
  description: 'Plan your travel itinerary with ease',
};

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const colorScheme = cookieStore.get('color-scheme')?.value === 'dark' ? 'dark' : 'light';
  const session = await getServerSession();
  const temperatureUnitCookie = cookieStore.get('temperature-unit')?.value === 'f' ? 'f' : 'c';

  return (
    <html lang='en'>
      <body className={inter.className}>
        <GlobalRecoilRoot>
          <GlobalSessionProvider session={session}>
            <RootStyleRegistry themeColor={colorScheme}>
              <GlobalAppShell temperatureUnitCookie={temperatureUnitCookie}>{children}</GlobalAppShell>
            </RootStyleRegistry>
          </GlobalSessionProvider>
        </GlobalRecoilRoot>
      </body>
    </html>
  );
}
