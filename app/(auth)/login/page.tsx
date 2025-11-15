// app/(auth)/login/page.tsx
import { Ripple } from "@/components/ui/ripple";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AuthFormUI } from "../_components/authForm";

export default async function AuthPage() {
  // Get session without using headers() directly
  const session = await auth.api.getSession({
    headers: {
      // BetterAuth will handle the headers internally
    } as any,
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Ripple />
      <div className="relative z-10 container mx-auto px-4 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <AuthFormUI />
        </div>
      </div>
    </div>
  );
}
