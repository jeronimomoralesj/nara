"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuroraProps {
  className?: string;
  /** Use lighter blobs for dark backgrounds. */
  variant?: "light" | "dark";
}

/**
 * Ambient, slowly drifting gradient blobs that live behind content. The gentle
 * perpetual motion makes a section feel like it's breathing. Purely decorative
 * and frozen for users who prefer reduced motion.
 */
export function Aurora({ className, variant = "light" }: AuroraProps) {
  const reduce = useReducedMotion();

  const blobs =
    variant === "dark"
      ? [
          "bg-blue-500/25",
          "bg-blue-400/20",
          "bg-blue-700/25",
        ]
      : ["bg-blue-300/30", "bg-blue-200/40", "bg-blue-400/20"];

  const motions = [
    { x: [0, 40, -20, 0], y: [0, -30, 20, 0], duration: 18 },
    { x: [0, -50, 30, 0], y: [0, 25, -25, 0], duration: 22 },
    { x: [0, 30, -40, 0], y: [0, 30, 10, 0], duration: 26 },
  ];

  const positions = [
    "left-[-10%] top-[-10%] h-[42vh] w-[42vh]",
    "right-[-8%] top-[20%] h-[38vh] w-[38vh]",
    "bottom-[-12%] left-[30%] h-[40vh] w-[40vh]",
  ];

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
      aria-hidden
    >
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className={cn(
            "absolute rounded-full blur-[80px] sm:blur-[110px]",
            blobs[i],
            pos
          )}
          animate={
            reduce
              ? undefined
              : { x: motions[i].x, y: motions[i].y, scale: [1, 1.12, 0.95, 1] }
          }
          transition={{
            duration: motions[i].duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
