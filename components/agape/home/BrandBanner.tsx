'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Wand2 } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Slim, marketplace-style brand banner above the shop grid. */
export default function BrandBanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft halos */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-cielo-100 blur-3xl" />
      <div className="pointer-events-none absolute -top-10 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-oro/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-14 text-center sm:px-6 sm:pb-16 sm:pt-20">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[0.6rem] font-semibold uppercase tracking-[0.45em] text-oro-deep sm:text-xs"
        >
          Amar como Dios nos ama
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mt-3 flex flex-col items-center"
        >
          <h1 className="font-logo text-6xl leading-none text-royal sm:text-7xl lg:text-8xl">
            ÁGAPE
          </h1>
          <div className="mt-3 flex items-center gap-2.5">
            <span className="text-[0.55rem] font-semibold uppercase tracking-[0.35em] text-royal/40">by</span>
            <div className="relative h-5 w-5 shrink-0">
              <Image src="/logo-nara.jpg" alt="Fundación Nara" fill sizes="20px" className="object-contain" />
            </div>
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-royal/60">Fundación Nara</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
          className="mx-auto mt-4 max-w-md text-balance font-serif text-sm italic text-royal/70 sm:text-base"
        >
          “Él sana a los de corazón herido y venda sus heridas”
          <span className="mt-1.5 block font-sans text-[0.6rem] font-semibold uppercase not-italic tracking-[0.35em] text-oro-deep sm:text-[0.65rem]">
            Salmo 147:3
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.32 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/agape/personalizar"
            className="inline-flex items-center gap-2 rounded-full border border-oro/50 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-oro-deep transition-all duration-300 hover:bg-oro/10 hover:shadow-aura-soft"
          >
            <Wand2 className="h-3.5 w-3.5" />
            Diseña tu propia pulsera
          </Link>
          <Link
            href="/agape/collar-nombres"
            className="inline-flex items-center gap-2 rounded-full border border-oro/50 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-oro-deep transition-all duration-300 hover:bg-oro/10 hover:shadow-aura-soft"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Crea tu collar de nombres
          </Link>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
          className="gold-divider mt-8"
        />
      </div>
    </section>
  );
}
