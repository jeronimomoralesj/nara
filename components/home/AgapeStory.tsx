"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Home, Stethoscope, Utensils } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Tilt } from "@/components/motion/Tilt";
import type { Product } from "@/lib/agape/types";

const AGAPE_URL = "/agape";

// Fallback cards shown when DB is not yet connected
const FALLBACK_BRACELETS = [
  { name: "Amanecer", desc: "Tonos cálidos tejidos a mano", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80" },
  { name: "Raíz",    desc: "Hilo encerado y cuentas de madera", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80" },
  { name: "Abrazo",  desc: "Trenzado doble en terracota", image: "https://images.unsplash.com/photo-1620061145951-5e3b0e3f2b9e?auto=format&fit=crop&w=900&q=80" },
  { name: "Sereno",  desc: "Minimalismo en tonos arena", image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=900&q=80" },
  { name: "Origen",  desc: "Edición fundadora limitada", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80" },
];

const allocation = [
  { icon: Home, label: "Vivienda" },
  { icon: Stethoscope, label: "Salud" },
  { icon: Utensils, label: "Nutrición" },
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
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="eyebrow">La historia viva · Agape</span>
            </Reveal>
            <TextReveal
              as="h2"
              text="Un hilo que sostiene una vida."
              highlight={["sostiene"]}
              className="mt-4 max-w-3xl font-display text-3xl font-light tracking-tightest text-charcoal sm:text-5xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-charcoal-muted">
                Fundación Nara nace de la mano de{" "}
                <span className="font-medium text-charcoal">Agape</span>. Cada
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
                  Visitar Agape
                  <ArrowUpRight size={18} />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>

        {/* Allocation chips */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-3">
            {allocation.map((a) => (
              <span
                key={a.label}
                className="inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-cream px-4 py-2 text-sm font-medium text-charcoal"
              >
                <a.icon size={16} className="text-blue-500" />
                {a.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Horizontal showcase — breaks the container for an immersive edge */}
      <div className="mt-14">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:px-8 lg:px-12 [scroll-padding-left:1.5rem]">
          {cards.map((b, i) => (
            <motion.article
              key={b.name + i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8 }}
              className="group relative w-[260px] shrink-0 snap-start sm:w-[300px]"
            >
              <Tilt className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-blue-50">
                {b.image && (
                  <Image
                    src={b.image}
                    alt={`Pulsera Ágape ${b.name}`}
                    fill
                    sizes="300px"
                    unoptimized={b.image.startsWith("/api/")}
                    className="object-cover transition-transform duration-700 ease-organic group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <Link
                    href={b.id ? `/agape/producto/${b.id}` : AGAPE_URL}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-charcoal"
                  >
                    {b.price ? `COP ${b.price.toLocaleString("es-CO")}` : "Apoyar con esta"}
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
                <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700 backdrop-blur">
                  100% impacto
                </span>
              </Tilt>
              <div className="mt-4 px-1">
                <h3 className="font-display text-xl font-normal tracking-tight text-charcoal">
                  {b.name}
                </h3>
                <p className="mt-1 text-sm text-charcoal-muted">{b.desc}</p>
              </div>
            </motion.article>
          ))}

          {/* Tail CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="w-[260px] shrink-0 snap-start sm:w-[300px]"
          >
          <Link
            href={AGAPE_URL}
            className="group flex h-full flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-blue-300 bg-cream p-8 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={24} />
            </span>
            <p className="mt-5 font-display text-xl font-normal text-charcoal">
              Ver toda la colección
            </p>
            <p className="mt-2 text-sm text-charcoal-muted">
              Cada pieza, una historia restaurada.
            </p>
          </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
