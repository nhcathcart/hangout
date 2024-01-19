import { prisma } from "./server/db/client";

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});

// export const authConfig = {
//   adapter: PrismaAdapter(prisma),
//   providers: [GitHub],
//   secret: process.env.AUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     jwt({ token, account, user }) {
//       if (account) {
//         token.accessToken = account.access_token
//         token.id = user?.id
//       }
//       return token
//     },
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = auth?.user;
//       const paths = ["/profile"];
//       console.log("auth is, ", auth)
//       const isProtected = paths.some((path) =>
//         nextUrl.pathname.startsWith(path)
//       );

//       if (isProtected && !isLoggedIn) {
//         const redirectUrl = new URL("api/auth/signin", nextUrl.origin);
//         redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
//         return Response.redirect(redirectUrl);
//       }

//       return true;
//     },
//   },
// } satisfies NextAuthConfig;

// export const { handlers, auth, signOut } = NextAuth(authConfig);
