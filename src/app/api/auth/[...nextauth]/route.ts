import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return NextAuth({
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
        // profile(profile) {
        //   return {
        //     id: profile.id,
        //     name: profile.name,
        //     email: profile.email,
        //     image: profile.avatar_url,
        //   };
        // },
      }),
    ],
    callbacks: {
      async session({ session, token, user }) {
        if (session.user) {
          session.user.id = token.sub;
        }

        return session;
      },
    },
  });
}

export async function POST(request: NextRequest) {
  return NextAuth({
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
      }),
    ],
    callbacks: {
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.sub;
        }

        return session;
      },
    },
  });
}
