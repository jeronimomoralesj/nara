"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
}

/**
 * Infinite horizontal ticker. The content is rendered twice so the loop is
 * seamless; CSS handles the motion (paused under reduced-motion).
 */
export function Marquee({ items, className }: MarqueeProps) {
  const reduce = useReducedMotion();

  const Track = () => (
    <div
      className={cn(
        "flex shrink-0 items-center gap-10 pr-10",
        !reduce && "animate-marquee"
      )}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-display text-2xl font-normal tracking-tight sm:text-3xl">
            {item}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <Track />
      {!reduce && <Track />}
    </div>
  );
}
