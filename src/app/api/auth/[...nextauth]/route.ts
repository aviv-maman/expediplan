// import NextAuth, { type NextAuthOptions } from 'next-auth';
// import GithubProvider from 'next-auth/providers/github';

// const handler: NextAuthOptions = NextAuth({
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//       // profile(profile) {
//       //   return {
//       //     id: profile.id,
//       //     name: profile.name,
//       //     email: profile.email,
//       //     image: profile.avatar_url,
//       //   };
//       // },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token, user }) {
//       if (session.user) {
//         session.user.id = token.sub;
//       }

//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ message: 'Hello world' });
}
