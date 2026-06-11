"use client";

import Image from "next/image";
import { ArrowUpRight, HeartHandshake, Home, Stethoscope } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const AGAPE_URL = "https://agape-rust.vercel.app";

const allocation = [
  { icon: Home, label: "Vivienda", desc: "Un techo digno y seguro." },
  { icon: Stethoscope, label: "Salud", desc: "Atención médica continua." },
  { icon: HeartHandshake, label: "Nutrición", desc: "Alimentación balanceada." },
];

export function AgapeMission() {
  return (
    <section id="mision" className="section-padding bg-white">
      <div className="container-content">
        <Reveal>
          <span className="eyebrow">Cómo empezamos</span>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tightest text-charcoal sm:text-4xl lg:text-5xl">
            Una alianza con propósito:{" "}
            <span className="text-terracotta-500">Agape</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal-muted">
            Fundación Nara nace de la mano de Agape. Cada pieza que adquieres se
            convierte en cuidado real para un adulto mayor en abandono. Sin
            intermediarios, sin desvíos.
          </p>
        </Reveal>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product spotlight */}
          <Reveal>
            <div className="group relative overflow-hidden rounded-3xl border border-charcoal/10 bg-alabaster p-2">
              <div className="relative aspect-square w-full overflow-hidden rounded-[1.25rem] bg-terracotta-50">
                <Image
                  src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1100&q=80"
                  alt="Pulsera artesanal de Agape"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-4 px-5 py-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-terracotta-600">
                    Pulsera Agape
                  </p>
                  <p className="mt-1 text-lg font-semibold tracking-tight text-charcoal">
                    Símbolo de un nuevo comienzo
                  </p>
                </div>
                <a
                  href={AGAPE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-terracotta-500 text-white transition-transform duration-300 hover:scale-105"
                  aria-label="Ver pulseras Agape"
                >
                  <ArrowUpRight size={20} />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Impact statement */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-charcoal p-8 text-white sm:p-10">
              <p className="text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                El{" "}
                <span className="text-terracotta-300">100% de las ganancias</span>{" "}
                de las pulseras Agape se destina directamente a vivienda, salud y
                nutrición para los adultos mayores olvidados.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {allocation.map((a) => (
                  <div
                    key={a.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <a.icon
                      size={22}
                      className="text-terracotta-300"
                      strokeWidth={1.75}
                    />
                    <p className="mt-3 text-sm font-semibold">{a.label}</p>
                    <p className="mt-1 text-xs leading-snug text-white/60">
                      {a.desc}
                    </p>
                  </div>
                ))}
              </div>

              <Button
                variant="primary"
                size="lg"
                className="mt-10 w-full sm:w-auto"
                onClick={() => window.open(AGAPE_URL, "_blank", "noopener")}
              >
                Conocer Agape
                <ArrowUpRight size={18} />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
