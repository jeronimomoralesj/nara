"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  /** Raw value placed on the clipboard. */
  value: string;
  /** Visible label (defaults to value). */
  label?: string;
  className?: string;
}

/**
 * Tactile "click to copy" control with elastic press feedback and a
 * satisfying check-mark confirmation.
 */
export function CopyButton({ value, label = "Copiar", className }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Fallback for older browsers / insecure contexts
      const el = document.createElement("textarea");
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <motion.button
      type="button"
      onClick={copy}
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors",
        copied
          ? "bg-emerald-500 text-white"
          : "bg-charcoal text-white hover:bg-charcoal-soft",
        className
      )}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="done"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-2"
          >
            <Check size={16} /> ¡Copiado!
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-2"
          >
            <Copy size={16} /> {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
