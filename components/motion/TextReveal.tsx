"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

interface TextRevealProps {
  text: string;
  as?: Tag;
  className?: string;
  /** Seconds between each word lifting into place. */
  stagger?: number;
  /** Delay before the first word. */
  delay?: number;
  /** Render the animation immediately instead of waiting for scroll. */
  immediate?: boolean;
  /** Words to wrap in the terracotta accent color. */
  highlight?: string[];
}

const container: Variants = {
  hidden: {},
  visible: (custom: { stagger: number; delay: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
};

const word: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Organic text-reveal: each word is masked and elegantly lifts into place
 * with a stagger, mimicking editorial title sequences.
 */
export function TextReveal({
  text,
  as = "h2",
  className,
  stagger = 0.045,
  delay = 0,
  immediate = false,
  highlight = [],
}: TextRevealProps) {
  const MotionTag = motion[as];
  const words = text.split(" ");
  const highlightSet = new Set(highlight.map((w) => w.toLowerCase()));

  return (
    <MotionTag
      className={cn("flex flex-wrap", className)}
      variants={container}
      custom={{ stagger, delay }}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once: true, margin: "-60px" } })}
    >
      {words.map((w, i) => {
        const clean = w.replace(/[.,—]/g, "").toLowerCase();
        const accent = highlightSet.has(clean);
        return (
          <span
            key={`${w}-${i}`}
            className="relative mr-[0.28em] inline-block overflow-hidden py-[0.02em]"
            style={{ verticalAlign: "top" }}
          >
            <motion.span
              variants={word}
              className={cn("inline-block", accent && "text-terracotta-500")}
            >
              {w}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}
