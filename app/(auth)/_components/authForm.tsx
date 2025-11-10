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
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

export function AuthFormUI() {
  const [isGooglePending, startGoogleTransition] = useTransition();

  async function signInWithGoogle() {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard", // redirect to homepage or dashboard
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in With Google, redirecting...");
          },
          onError: (error) => {
            {
              toast.error(`Error signing in: ${error.error.message}`);
              console.error("Google Sign-in Error:", error);
            }
          }, // Set to true if you want to redirect after sign-in
        },
      });
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg border border-border">
        {/* ---- Company Branding ---- */}
        <CardHeader className="flex flex-col items-center space-y-3 pb-0">
          <Image
            src="/images/mailchimp.svg" // 👈 replace with your company logo path
            alt="Company Logo"
            width={64}
            height={64}
            className="rounded-full"
          />
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
