"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import type { Product } from "@/lib/agape/types";

const AGAPE_URL = "/agape";

const FALLBACK_BRACELETS = [
  { name: "Amanecer", desc: "Tonos cálidos tejidos a mano", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80" },
  { name: "Raíz",    desc: "Hilo encerado y cuentas de madera", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80" },
  { name: "Abrazo",  desc: "Trenzado doble en terracota", image: "https://images.unsplash.com/photo-1620061145951-5e3b0e3f2b9e?auto=format&fit=crop&w=900&q=80" },
  { name: "Sereno",  desc: "Minimalismo en tonos arena", image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=900&q=80" },
  { name: "Origen",  desc: "Edición fundadora limitada", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80" },
  { name: "Paz",     desc: "Blanco y plata, tejido en seda", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80" },
];

interface Props {
  products?: Product[];
}

export function AgapeStory({ products = [] }: Props) {
  const cards = products.length > 0
    ? products.slice(0, 6).map((p) => ({
        name: p.title,
        desc: p.description?.slice(0, 60) ?? "",
        image: p.images?.[0] ?? "",
        price: p.price,
        id: String(p._id),
      }))
    : FALLBACK_BRACELETS.map((b) => ({ ...b, price: undefined, id: undefined }));

  return (
    <section id="historia" className="section-padding bg-white">
      <div className="container-content">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="eyebrow">La historia viva</span>
            </Reveal>

            {/* Ágape × Nara logo treatment */}
            <div className="mt-3 flex items-center gap-3">
              <span className="font-logo text-4xl leading-none text-blue-500 sm:text-5xl">
                ÁGAPE
              </span>
              <span className="text-[0.5rem] font-semibold uppercase tracking-[0.3em] text-charcoal/35">
                by
              </span>
              <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="/logo-nara.jpg"
                  alt="Fundación Nara"
                  fill
                  sizes="24px"
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-charcoal/65">
                Nara
              </span>
            </div>

            <TextReveal
              as="h2"
              text="Un hilo que sostiene una vida."
              highlight={["sostiene"]}
              className="mt-4 max-w-3xl font-display text-3xl font-light tracking-tightest text-charcoal sm:text-5xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-charcoal-muted">
                Fundación Nara nace de la mano de{" "}
                <span className="font-medium text-charcoal">Ágape</span>. Cada
                pulsera se teje a mano y el{" "}
                <span className="font-medium text-blue-600">
                  100% de sus ganancias
                </span>{" "}
                financia directamente comida, refugio y salud para un adulto
                mayor olvidado. Sin intermediarios.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <Reveal delay={0.15}>
              <Button asChild size="lg">
                <Link href={AGAPE_URL}>
                  Visitar Ágape
                  <ArrowUpRight size={18} />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>

        {/* ── Product grid ───────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {cards.map((b, i) => (
            <motion.div
              key={b.name + i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={b.id ? `/agape/producto/${b.id}` : AGAPE_URL}
                className="group block"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-blue-50">
                  {b.image && (
                    <Image
                      src={b.image}
                      alt={`Pulsera Ágape ${b.name}`}
                      fill
                      sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 280px"
                      unoptimized={b.image.startsWith("/api/")}
                      className="object-cover transition-transform duration-700 ease-organic group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-700 backdrop-blur sm:left-4 sm:top-4 sm:text-[11px]">
                    100% impacto
                  </span>
                  {b.price && (
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-charcoal backdrop-blur sm:text-sm">
                        COP {b.price.toLocaleString("es-CO")}
                        <ArrowUpRight size={13} />
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-3 px-0.5">
                  <h3 className="font-display text-base font-normal tracking-tight text-charcoal transition-colors group-hover:text-blue-600 sm:text-lg">
                    {b.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-charcoal-muted sm:text-sm line-clamp-1">{b.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── "Ver toda la colección" link ───────────────────── */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex justify-center">
            <Link
              href={AGAPE_URL}
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 underline-offset-4 hover:underline"
            >
              Ver toda la colección
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>

        {/* ── Personalised options ───────────────────────────── */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/agape/personalizar"
              className="inline-flex items-center gap-2 rounded-full border border-blue-300 bg-blue-50 px-5 py-2.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
            >
              <Wand2 size={15} />
              Personaliza tu propia pulsera
            </Link>
            <Link
              href="/agape/personalizar"
              className="inline-flex items-center gap-2 rounded-full border border-blue-300 bg-blue-50 px-5 py-2.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
            >
              <Wand2 size={15} />
              Personaliza tu collar
            </Link>
            <Link
              href="/agape/collar-nombres"
              className="inline-flex items-center gap-2 rounded-full border border-blue-300 bg-blue-50 px-5 py-2.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
            >
              <Sparkles size={15} />
              Collar con nombres
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
