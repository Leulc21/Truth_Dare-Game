import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CTA_SECTION() {
  return (
    <section className="pt-10 md:pt-32 container mx-auto">
      <div className="flex w-full flex-col gap-16 overflow-hidden rounded-lg bg-primary/10 p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-16">
        <div className="flex-1">
          <Badge>Ready to Play?</Badge>
          <h2 className="my-3 text-2xl font-bold tracking-tight sm:text-5xl lg:text-4xl/none">
            Turn Any Moment Into an Unforgettable Game
          </h2>
          <p className="text-xl text-muted-foreground pt-1">
            Start your AI-powered Truth or Dare adventure. Create a custom game,
            choose your vibe, invite players, and let the fun begin—all within
            seconds.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button className="text-base px-6 py-5">Start a Game</Button>
        </div>
      </div>
    </section>
  );
}
