// auth.ts
import prisma from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },
  baseURL: process.env.BETTER_AUTH_URL || process.env.AUTH_URL,
  basePath: "/api/auth",
  trustedOrigins: [
    "https://truth-dare-game-one.vercel.app",
    "http://localhost:3000",
  ],
});
