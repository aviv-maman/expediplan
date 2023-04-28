'use client';
// import { type AppType } from 'next/app';
// import { type Session } from 'next-auth';
// import { SessionProvider } from 'next-auth/react';

// const GlobalSessionProvider: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   );
// };

// export default GlobalSessionProvider;

'use client';
import { SessionProvider } from 'next-auth/react';
import { type Session } from 'next-auth';

export default function GlobalSessionProvider({ children, session }: { children: React.ReactNode; session: Session | null }) {
  return <SessionProvider>{children}</SessionProvider>;
}
