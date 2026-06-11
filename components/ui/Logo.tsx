import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Show only the icon mark, without the wordmark. */
  markOnly?: boolean;
  /** Render the wordmark in white (for dark backgrounds). */
  inverted?: boolean;
  className?: string;
}

/**
 * Fundación Nara logo — an abstract "embrace" mark (two curved figures
 * forming a heart) plus the wordmark. Dummy/placeholder brand asset.
 */
export function Logo({ markOnly = false, inverted = false, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9 shrink-0" />
      {!markOnly && (
        <span
          className={cn(
            "text-lg font-semibold tracking-tightest",
            inverted ? "text-white" : "text-charcoal"
          )}
        >
          Fundación&nbsp;<span className="text-blue-500">Nara</span>
        </span>
      )}
    </span>
  );
}

/** The standalone icon mark — a blue badge with an embrace/heart. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label="Fundación Nara"
      className={className}
    >
      <rect width="40" height="40" rx="11" fill="#2C5DA8" />
      {/* Two curved figures leaning together to form a heart/embrace */}
      <path
        d="M20 29.5c-1.1-1-4.7-3.9-6.6-6.6-1.9-2.7-1.4-5.9 1.1-7 2-0.9 4.1 0 5.5 1.9 1.4-1.9 3.5-2.8 5.5-1.9 2.5 1.1 3 4.3 1.1 7-1.9 2.7-5.5 5.6-6.6 6.6Z"
        fill="#EEF4FB"
      />
      {/* Small heads above the embrace */}
      <circle cx="15.2" cy="13.4" r="2.1" fill="#EEF4FB" />
      <circle cx="24.8" cy="13.4" r="2.1" fill="#EEF4FB" />
    </svg>
  );
}
