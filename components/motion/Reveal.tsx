"use client";

import { motion, type Variants } from "framer-motion";
import * as React from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "article";
}

const variants: Variants = {
  hidden: (custom: { y: number }) => ({ opacity: 0, y: custom.y }),
  visible: (custom: { delay: number }) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: custom.delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

/** Subtle scroll-triggered fade-and-rise. Animates once. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      custom={{ delay, y }}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
