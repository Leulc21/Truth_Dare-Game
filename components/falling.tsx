"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

/* --- Single animated card --- */
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
  borderRadius = 16,
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
  borderRadius?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          style={{ borderRadius }}
          className={cn(
            "absolute inset-0",
            "bg-linear-to-r to-transparent",
            gradient,
            "backdrop-blur-[1px]",
            "ring-1 ring-white/[0.03] dark:ring-white/[0.02]",
            "shadow-[0_2px_16px_-2px_rgba(255,255,255,0.04)]",
            "after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12),transparent_70%)] after:rounded-[inherit]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

/* --- Falling cards background --- */
export default function FallingCardsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <ElegantShape
        delay={0.2}
        width={200}
        height={200}
        rotate={-25}
        borderRadius={28}
        gradient="from-blue-500/[0.25] dark:from-blue-500/[0.35]"
        className="left-[10%] top-[20%]"
      />
      <ElegantShape
        delay={0.4}
        width={300}
        height={300}
        rotate={15}
        borderRadius={32}
        gradient="from-purple-500/[0.25] dark:from-purple-500/[0.35]"
        className="right-[15%] top-[40%]"
      />
      <ElegantShape
        delay={0.6}
        width={400}
        height={150}
        rotate={-10}
        borderRadius={16}
        gradient="from-teal-500/[0.25] dark:from-teal-500/[0.35]"
        className="left-[30%] bottom-[10%]"
      />
      <ElegantShape
        delay={0.8}
        width={150}
        height={100}
        rotate={30}
        borderRadius={12}
        gradient="from-amber-500/[0.25] dark:from-amber-500/[0.35]"
        className="right-[25%] bottom-[20%]"
      />
    </div>
  );
}
