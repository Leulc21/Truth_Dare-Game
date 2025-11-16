"use client";

import { Button } from "@/components/ui/button"; // ✅ use ShadCN button
import React from "react";

import FallingCardsBackground from "./falling";
import TextRotate from "./fancy/text/text-rotate";
import Highlighter from "./ui/highlighter";

const Hero: React.FC = () => (
  <section className="relative z-10 text-center pt-4 pb-4 sm:pt-40 sm:pb-4 px-4 mb-4 sm:mb-2">
    <div className="max-w-4xl mx-auto">
      <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full mb-4 sm:mb-2">
        Truth-Dare-AI-Game
      </span>

      {/* Hero Text */}
      <div className="mt-4 space-y-3 sm:space-y-4">
        {/* Mobile layout */}
        <div className="block sm:hidden space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground leading-tight">
            just got AI-supercharged
          </h1>

          <div className="flex justify-center">
            <TextRotate
              texts={[
                "spicy ✦",
                "wild!",
                "bold 🕶️",
                "unexpected",
                "fun",
                "chaotic ✹",
                "legendary",
              ]}
              mainClassName="text-primary-foreground text-2xl px-6 bg-primary overflow-hidden py-2 justify-center rounded-lg min-w-[160px] font-bold"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground leading-tight">
            just got AI-supercharged
          </h1>
        </div>

        {/* Desktop layout */}
        <div className="hidden sm:flex items-center justify-center flex-wrap gap-2">
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Your wildest Truth or Dare
          </h1>

          <TextRotate
            texts={[
              "wild 🤪",
              "bold 🔥",
              "truthful ✦",
              "daring ⚡",
              "chaotic 🎉",
              "fun 😆",
              "epic 🕶️",
            ]}
            mainClassName="text-primary-foreground text-3xl lg:text-4xl px-6 lg:px-8 bg-primary overflow-hidden py-2 lg:py-3 justify-center rounded-lg min-w-[200px] lg:min-w-[260px] mx-2 font-bold"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />

          <h2 className="text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            just got AI-supercharged
          </h2>
        </div>
      </div>

      {/* Description */}
      <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
        <Highlighter color="#d97757">
          Turn any moment into an unforgettable party
        </Highlighter>
        with AI-generated Truth & Dare challenges crafted for friends, couples,
        and wild nights.
        <Highlighter color="#d97757" action="circle">
          No repeats, no awkward
        </Highlighter>
        silence just pure chaos, fun, and adventure.
      </p>

      {/* Buttons */}
      <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <Button className="w-full sm:w-auto text-sm sm:text-base">
          Start a Game
        </Button>
        <Button
          variant="secondary"
          className="w-full sm:w-auto text-sm sm:text-base"
        >
          Explore Modes
        </Button>
      </div>
    </div>
  </section>
);

export default function HeroSection() {
  return (
    <div className="relative w-full mt-12 min-h-screen overflow-hidden bg-background">
      {/* Falling cards background */}
      <FallingCardsBackground />

      {/* Gradient Backgrounds */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[40rem] h-[40rem] bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl opacity-30" />
      </div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 pointer-events-none">
        <div className="w-[40rem] h-[40rem] bg-gradient-to-bl from-secondary/20 to-transparent rounded-full blur-3xl opacity-30" />
      </div>

      <main>
        <Hero />
      </main>
    </div>
  );
}
