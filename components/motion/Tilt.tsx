"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface TiltProps {
  children: React.ReactNode;
  /** Max rotation in degrees. */
  max?: number;
  className?: string;
}

/**
 * Pointer-driven 3D tilt with a subtle lift. Gives cards a tactile, physical
 * presence as the cursor moves across them. Inert under reduced-motion.
 */
export function Tilt({ children, max = 9, className }: TiltProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springConfig = { stiffness: 220, damping: 18, mass: 0.4 };
  const rotateX = useSpring(rx, springConfig);
  const rotateY = useSpring(ry, springConfig);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  }

  function reset() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={reduce ? undefined : { z: 30 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
