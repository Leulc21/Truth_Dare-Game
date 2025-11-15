import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const logos = [
  { name: "Arif", img: "/icons/arif.svg" },
  { name: "AASTU", img: "/icons/aastu.svg" },
  { name: "AAU", img: "/icons/aau.svg" },
  { name: "Arada", img: "/icons/arada.svg" },
  { name: "Art", img: "/icons/art.svg" },
  { name: "Pepsi", img: "/icons/pepsi.svg" },
  { name: "Dink", img: "/icons/dink.svg" },
  { name: "Habesha", img: "/icons/habesha.svg" },
  { name: "Safaricom", img: "/icons/safaricom.svg" },
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
