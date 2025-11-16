// auth-client.ts
import { createAuthClient } from "better-auth/react";

// More reliable base URL detection
const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NODE_ENV === "production"
    ? "https://truth-dare-game-one.vercel.app"
    : "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});
