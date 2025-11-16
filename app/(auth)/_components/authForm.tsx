"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Chrome, Loader } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

const LogoIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 6H10V10H6V6Z" fill="#d97757" />
    <path d="M14 6H18V10H14V6Z" fill="#d97757" />
    <path d="M6 14H10V18H6V14Z" fill="#d97757" />
    <path d="M14 14H18V18H14V14Z" fill="#d97757" fillOpacity="0.5" />
  </svg>
);

export function AuthFormUI() {
  const [isGooglePending, startGoogleTransition] = useTransition();

  async function signInWithGoogle() {
    startGoogleTransition(async () => {
      try {
        const result = await authClient.signIn.social({
          provider: "google",
          callbackURL: "/dashboard",
        });

        if (result.error) {
          console.error("Google Sign-in Error:", result.error);
          toast.error(
            `Error signing in: ${result.error.message || "Unknown error"}`
          );
        } else {
          toast.success("Signed in With Google, redirecting...");
        }
      } catch (error: any) {
        console.error("Google Sign-in Exception:", error);
        toast.error(
          `Error signing in: ${error?.message || "Unknown error occurred"}`
        );
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg border border-border">
        {/* ---- Company Branding ---- */}
        <CardHeader className="flex flex-col items-center space-y-3 pb-0">
          <LogoIcon />
          <CardTitle className="text-3xl font-semibold text-center">
            Truth Dare Ai
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Sign in securely with Google to continue
          </CardDescription>
        </CardHeader>

        {/* ---- Auth Button ---- */}
        <CardContent className="pt-2">
          <Button
            onClick={signInWithGoogle}
            variant="outline"
            className="w-full"
            disabled={isGooglePending}
          >
            {isGooglePending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Chrome className="mr-2 h-4 w-4" />
                Continue with Google
              </>
            )}
          </Button>

          {/* ---- Legal Text ---- */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              By continuing, you agree to our{" "}
              <a href="/terms" className="underline hover:text-primary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline hover:text-primary">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
