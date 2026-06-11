"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Slim reading-progress bar pinned to the very top of the viewport.
 * Fills as the visitor scrolls the page — a quiet sign the site is alive.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700"
      aria-hidden
    />
  );
}
