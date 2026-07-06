"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowUpRight } from "lucide-react";

export function FloatingAgapeButton() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const section = document.getElementById("historia");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.88 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-7 left-1/2 z-50 -translate-x-1/2"
        >
          <Link
            href="/agape"
            className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-[#0E2152] px-5 py-3 shadow-[0_8px_40px_-8px_rgba(14,33,82,0.55)] transition-all duration-300 hover:shadow-[0_12px_50px_-8px_rgba(14,33,82,0.7)] hover:scale-[1.03]"
          >
            {/* Gold glow ring */}
            <span className="absolute inset-0 rounded-full ring-1 ring-[#D4AF37]/40 transition-all duration-300 group-hover:ring-[#D4AF37]/70" />

            {/* Icon badge */}
            <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] shadow-[0_0_12px_2px_rgba(212,175,55,0.35)]">
              <ShoppingBag size={13} className="text-[#091740]" strokeWidth={2.2} />
            </span>

            {/* Text */}
            <span className="relative flex flex-col leading-none">
              <span className="font-logo text-lg tracking-wide text-white">ÁGAPE</span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/80">
                Apoya comprando
              </span>
            </span>

            {/* Arrow */}
            <span className="relative ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-white/20">
              <ArrowUpRight size={13} className="text-white" />
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
