"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const links = [
  { label: "Misión", href: "#mision" },
  { label: "Cómo Ayudar", href: "#ayudar" },
  { label: "Visión", href: "#vision" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-charcoal/10 bg-white/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container-content flex h-16 items-center justify-between px-6 sm:px-8 lg:px-12">
        <a href="#inicio" aria-label="Fundación Nara — Inicio">
          <Logo />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal-muted transition-colors hover:text-charcoal"
            >
              {link.label}
            </a>
          ))}
          <Button
            onClick={() =>
              document
                .getElementById("ayudar")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Apoyar Ahora
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
            className="overflow-hidden border-t border-charcoal/10 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-charcoal-muted transition-colors hover:bg-charcoal/5 hover:text-charcoal"
                >
                  {link.label}
                </a>
              ))}
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  setOpen(false);
                  document
                    .getElementById("ayudar")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Apoyar Ahora
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
