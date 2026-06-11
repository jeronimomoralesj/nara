"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight, Instagram, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { CopyButton } from "@/components/CopyButton";
import { cn } from "@/lib/utils";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Aliados", href: "/aliados" },
  { label: "Historias", href: "/historias" },
];

const NEQUI = "3106605566";
const NEQUI_PRETTY = "310 660 5566";

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Mail, href: "mailto:contacto@fundacionnara.org", label: "Correo" },
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

  // Lock body scroll while the overlay is open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-charcoal/10 bg-cream/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container-content flex h-16 items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link href="/" aria-label="Fundación Nara — Inicio" className="relative z-50">
          <Logo />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors",
                  active ? "text-charcoal" : "text-charcoal-muted hover:text-charcoal"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-blue-500"
                  />
                )}
              </Link>
            );
          })}
          <Button asChild>
            <Link href="/#ayudar">Apoyar Ahora</Link>
          </Button>
        </div>

        {/* Mobile trigger — animated hamburger */}
        <button
          className="relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-charcoal/5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <span className="relative block h-4 w-6">
            <motion.span
              className="absolute left-0 block h-[2px] w-6 rounded-full bg-charcoal"
              animate={open ? { top: 7, rotate: 45 } : { top: 1, rotate: 0 }}
              style={{ top: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="absolute left-0 top-[7px] block h-[2px] w-6 rounded-full bg-charcoal"
              animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 block h-[2px] w-6 rounded-full bg-charcoal"
              animate={open ? { top: 7, rotate: -45 } : { top: 13, rotate: 0 }}
              style={{ top: 13 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        </button>
      </nav>

      <MobileOverlay open={open} pathname={pathname} onClose={() => setOpen(false)} />
    </header>
  );
}

/* ---------- Mobile full-screen overlay ---------- */

const panel: Variants = {
  hidden: { clipPath: "circle(0% at calc(100% - 36px) 32px)" },
  visible: {
    clipPath: "circle(150% at calc(100% - 36px) 32px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    clipPath: "circle(0% at calc(100% - 36px) 32px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  exit: {},
};

const item: Variants = {
  hidden: { y: "120%" },
  visible: { y: "0%", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function MobileOverlay({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={panel}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-40 flex flex-col bg-cream md:hidden"
        >
          {/* Drifting glow for depth */}
          <motion.div
            aria-hidden
            animate={{ x: [0, 30, -10, 0], y: [0, 20, -15, 0], scale: [1, 1.15, 0.95, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-16 bottom-24 h-64 w-64 rounded-full bg-blue-300/30 blur-[90px]"
          />

          <div className="flex flex-1 flex-col px-6 pb-10 pt-24">
            {/* Links */}
            <motion.nav
              variants={list}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col"
            >
              {links.map((link, i) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <div
                    key={link.href}
                    className="overflow-hidden border-b border-charcoal/10"
                  >
                    <motion.div variants={item}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group flex items-baseline gap-4 py-4"
                      >
                        <span className="font-mono text-xs text-blue-500">
                          0{i + 1}
                        </span>
                        <span
                          className={cn(
                            "font-display text-4xl font-light tracking-tightest transition-colors",
                            active ? "text-blue-600" : "text-charcoal"
                          )}
                        >
                          {link.label}
                        </span>
                        <ArrowUpRight
                          size={22}
                          className="ml-auto self-center text-charcoal-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-500"
                        />
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </motion.nav>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <Button asChild size="lg" className="w-full">
                <Link href="/#ayudar" onClick={onClose}>
                  Apoyar Ahora
                  <ArrowUpRight size={18} />
                </Link>
              </Button>
            </motion.div>

            {/* Contact footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-auto pt-10"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-charcoal-muted">
                Dona vía Nequi / Daviplata
              </p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="font-display text-2xl text-charcoal">
                  {NEQUI_PRETTY}
                </span>
                <CopyButton value={NEQUI} label="Copiar" />
              </div>

              <div className="mt-6 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal-muted transition-colors hover:border-blue-500 hover:text-blue-500"
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
