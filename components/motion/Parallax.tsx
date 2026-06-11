"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  /** Vertical travel in pixels across the scroll range. */
  amount?: number;
  className?: string;
}

/**
 * Wraps content and shifts it vertically as it passes through the viewport,
 * creating depth. Respects `prefers-reduced-motion`.
 */
export function Parallax({ children, amount = 60, className }: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [amount, -amount]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
