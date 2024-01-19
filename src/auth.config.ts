import GitHub from "next-auth/providers/github"

import type { NextAuthConfig } from "next-auth"

export default {
  providers: [GitHub],
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig

