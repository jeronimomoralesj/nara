"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function NaraShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAgape = pathname.startsWith("/agape");
  return (
    <>
      {!isAgape && <Navbar />}
      {children}
      {!isAgape && <Footer />}
    </>
  );
}
