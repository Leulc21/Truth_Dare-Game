// auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

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
  baseURL: process.env.BETTER_AUTH_URL,
  basePath: "/api/auth",
  // Trust ALL Vercel domains
  trustedOrigins: [
    "https://truth-dare-game-one.vercel.app",
    "https://*.vercel.app", // This allows all preview deployments
    "http://localhost:3000",
  ],
});
