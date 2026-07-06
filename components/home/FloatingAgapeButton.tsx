"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.92 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-0 right-0 z-50 flex justify-center"
        >
          <Link
            href="/agape"
            className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-blue-100 bg-white px-4 py-2.5 shadow-[0_6px_32px_-4px_rgba(74,143,204,0.28)] transition-all duration-300 hover:border-blue-200 hover:shadow-[0_10px_40px_-4px_rgba(74,143,204,0.38)] hover:scale-[1.02]"
          >
            {/* Nara logo circle */}
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-blue-100 bg-blue-50">
              <Image
                src="/logo-nara.jpg"
                alt="Fundación Nara"
                fill
                sizes="32px"
                className="object-contain p-0.5"
              />
            </div>

            {/* Thin divider */}
            <div className="h-8 w-px shrink-0 bg-blue-100" />

            {/* ÁGAPE + subline */}
            <div className="flex flex-col leading-none">
              <span className="font-logo text-xl leading-none text-blue-500">
                ÁGAPE
              </span>
              <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-charcoal/45">
                Apoya comprando
              </span>
            </div>

            {/* Animated arrow pill */}
            <div className="relative ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500 transition-colors duration-300 group-hover:bg-blue-600">
              {/* Soft pulse ring */}
              <span className="absolute inset-0 rounded-full bg-blue-400 opacity-30 animate-ping" />
              <ArrowUpRight
                size={13}
                className="relative text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
