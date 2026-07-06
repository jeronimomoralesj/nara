import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  markOnly?: boolean;
  inverted?: boolean;
  className?: string;
}

export function Logo({ markOnly = false, inverted = false, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <div className="relative h-10 w-10 shrink-0">
        <Image
          src="/logo-nara.jpg"
          alt="Fundación Nara"
          fill
          sizes="40px"
          className="object-contain"
          priority
        />
      </div>
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

export function LogoMark({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/logo-nara.jpg"
        alt="Fundación Nara"
        fill
        sizes="40px"
        className="object-contain"
        priority
      />
    </div>
  );
}
