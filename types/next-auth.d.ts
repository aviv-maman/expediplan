import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: {
      id?: string | null;
    } & DefaultSession['user'];
    expires: ISODateString;
  }
  interface User {
    email_verified: Date | null;
  }
}
