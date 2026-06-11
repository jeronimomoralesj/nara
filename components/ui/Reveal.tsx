"use client";

import { motion, type Variants } from "framer-motion";
import * as React from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** HTML tag to render. Defaults to div. */
  as?: "div" | "section" | "li" | "span";
}

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/**
 * Subtle scroll-triggered fade-and-rise. Animates once on enter.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      custom={delay}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
