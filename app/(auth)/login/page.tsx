import { Ripple } from "@/components/ui/ripple";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AuthFormUI } from "../_components/authForm";

export default async function AuthPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (session) {
    // If the user is already authenticated, redirect them to the home page
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
