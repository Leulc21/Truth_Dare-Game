import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const logos = [
  { name: "linux", img: "/images/linux.svg" },
  { name: "react", img: "/images/rr.svg" },
  { name: "mastercard", img: "/images/mastercard.svg" },
  { name: "notion", img: "/images/notion.svg" },
  { name: "mercedes", img: "/images/mercedes.svg" },
  { name: "reddit", img: "/images/reddit.svg" },
  { name: "mailchimp", img: "/images/mailchimp.svg" },
  { name: "twitter", img: "/images/twitter.svg" },
];

export function LogoLoopMarquee() {
  return (
    <div className="relative w-full mb-24 mt-16">
      <Marquee pauseOnHover className="[--duration:20s]">
        {/* render plain svg images inline with spacing */}
        {logos.map((logo) => (
          <img
            key={logo.name}
            src={logo.img}
            alt={logo.name}
            className={cn(
              "mx-6 h-12 w-auto object-contain opacity-90",
              "transition-opacity duration-200 hover:opacity-100"
            )}
            // optional: prevent image dragging
            draggable={false}
          />
        ))}
      </Marquee>

      {/* optional: subtle fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/100 to-transparent dark:from-black/100" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white/100 to-transparent dark:from-black/100" />
    </div>
  );
}
