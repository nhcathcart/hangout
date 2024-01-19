import GitHub from "next-auth/providers/github"

import type { NextAuthConfig } from "next-auth"

export default {
  providers: [GitHub],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return { ...token, id: user.id };
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,

          id: token.id as string,
        },
      };
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = auth?.user;
      const paths = ["/profile"];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("api/auth/signin", nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      }

      return true;
    },
  },
} satisfies NextAuthConfig

