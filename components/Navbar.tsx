"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Aliados", href: "/aliados" },
  { label: "Historias", href: "/historias" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-charcoal/10 bg-cream/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container-content flex h-16 items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link href="/" aria-label="Fundación Nara — Inicio">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors",
                  active
                    ? "text-charcoal"
                    : "text-charcoal-muted hover:text-charcoal"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-terracotta-500"
                  />
                )}
              </Link>
            );
          })}
          <Button asChild>
            <Link href="/#ayudar">Apoyar Ahora</Link>
          </Button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-charcoal md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-charcoal/10 bg-cream/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-charcoal-muted transition-colors hover:bg-charcoal/5 hover:text-charcoal"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-2 w-full">
                <Link href="/#ayudar">Apoyar Ahora</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
