import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

export const authConfig = {
  providers: [GitHub],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    // async session({ session, user }) {
    //   session.user.id = user.id;
    //   return session;
    // },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = auth?.user;
      console.log(auth);
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
} satisfies NextAuthConfig;

export const { handlers, auth, signOut } = NextAuth(authConfig);
