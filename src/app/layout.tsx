import './globals.css';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import RootStyleRegistry from './emotion';
import GlobalAppShell from '@/layout/GlobalAppShell';
import GlobalRecoilRoot from '@/layout/GlobalRecoilRoot';
import GlobalSessionProvider from '@/layout/GlobalSessionProvider';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';

export const metadata = {
  title: 'ExpediPlan',
  description: 'Plan your travel itinerary with ease',
};

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const colorSchemeCookie = cookieStore.get('color-scheme')?.value === 'dark' ? 'dark' : 'light';
  const temperatureUnitCookie = cookieStore.get('temperature-unit')?.value === 'f' ? 'f' : 'c';
  const session = await getServerSession(authOptions);

  return (
    <html lang='en'>
      <body className={inter.className}>
        <GlobalRecoilRoot>
          <GlobalSessionProvider session={session}>
            <RootStyleRegistry colorSchemeCookie={colorSchemeCookie}>
              <GlobalAppShell temperatureUnitCookie={temperatureUnitCookie}>{children}</GlobalAppShell>
            </RootStyleRegistry>
          </GlobalSessionProvider>
        </GlobalRecoilRoot>
      </body>
    </html>
  );
}
