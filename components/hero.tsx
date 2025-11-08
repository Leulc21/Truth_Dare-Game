// components/hero1.tsx
"use client";
import React from "react";
import TextRotate from "./fancy/text/text-rotate";
import { Navbar } from "./navbar";
import Highlighter from "./ui/highlighter";

const Button: React.FC<{
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}> = ({ children, variant = "primary", className = "" }) => {
  const baseClasses =
    "px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105";

  const variants = {
    primary:
      "bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:ring-gray-900 dark:focus:ring-gray-300 shadow-lg hover:shadow-xl",
    secondary:
      "bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 focus:ring-gray-300 dark:focus:ring-gray-600 shadow-sm border border-gray-200 dark:border-gray-700",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Hero: React.FC = () => (
  <section className="relative z-10 text-center pt-4 pb-4 sm:pt-40 sm:pb-4 px-4">
    <div className="max-w-4xl mx-auto">
      <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-orange-600 dark:text-orange-400 uppercase bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4 sm:mb-2">
        Qupe Finance
      </span>

      {/* Improved Hero Text with better mobile layout */}
      <div className="mt-4 space-y-3 sm:space-y-4">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight sm:leading-tight">
          You've never made
        </h1>

        {/* Mobile: Stack layout */}
        <div className="block sm:hidden space-y-3">
          <div className="flex justify-center">
            <TextRotate
              texts={[
                "work!",
                "fancy ✽",
                "right",
                "fast",
                "fun",
                "rock",
                "🕶️🕶️🕶️",
              ]}
              mainClassName="text-white text-2xl px-6 bg-[#ff5941] overflow-hidden py-2 justify-center rounded-lg min-w-[160px] font-bold"
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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
            this fast before
          </h1>
        </div>

        {/* Desktop: Inline layout */}
        <div className="hidden sm:flex items-center justify-center flex-wrap gap-2">
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
            You've never made
          </h1>
          <TextRotate
            texts={[
              "work!",
              "fancy ✽",
              "right",
              "fast",
              "fun",
              "rock",
              "🕶️🕶️🕶️",
            ]}
            mainClassName="text-white text-3xl lg:text-4xl px-6 lg:px-8 bg-[#ff5941] overflow-hidden py-2 lg:py-3 justify-center rounded-lg min-w-[200px] lg:min-w-[260px] mx-2 font-bold"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
          <h2 className="text-5xl lg:text-6xl font-bold tracking-tight text-orange-500 leading-tight">
            this fast before
          </h2>
        </div>
      </div>

      <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        <Highlighter color="#FF9800">Gain financial acumen using </Highlighter>{" "}
        our expert tools and insights to efficiently manage your money and
        <Highlighter color="#FFC107" action="circle">
          enhance personal wealth.
        </Highlighter>
      </p>

      <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <Button
          variant="primary"
          className="w-full sm:w-auto text-sm sm:text-base"
        >
          Get started - for free
        </Button>
        <Button
          variant="secondary"
          className="w-full sm:w-auto text-sm sm:text-base"
        >
          Discover Qupe
        </Button>
      </div>
    </div>
  </section>
);

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white dark:bg-black">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[40rem] h-[40rem] bg-gradient-to-tr from-orange-200 dark:from-orange-800/30 to-transparent opacity-20 dark:opacity-10 rounded-full blur-3xl" />
      </div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 pointer-events-none">
        <div className="w-[40rem] h-[40rem] bg-gradient-to-bl from-orange-200 dark:from-orange-800/30 to-transparent opacity-20 dark:opacity-10 rounded-full blur-3xl" />
      </div>

      <Navbar />
      <main>
        {/* <HeroCentered /> Choose the version you prefer */}
        {/* <HeroInline /> */}
        <Hero />
      </main>
    </div>
  );
}
