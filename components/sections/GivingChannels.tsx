"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Gift, HeartHandshake, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn, formatCOP } from "@/lib/utils";

const AGAPE_URL = "https://agape-rust.vercel.app";
const PRESETS = [20000, 50000, 100000];

function DonationSelector() {
  const [selected, setSelected] = React.useState<number>(50000);
  const [custom, setCustom] = React.useState<string>("");
  const isCustom = selected === -1;

  const amount = isCustom ? Number(custom.replace(/\D/g, "")) || 0 : selected;

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {PRESETS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setSelected(value);
              setCustom("");
            }}
            className={cn(
              "rounded-xl border px-2 py-3 text-sm font-semibold tracking-tight transition-all duration-200",
              selected === value
                ? "border-terracotta-500 bg-terracotta-50 text-terracotta-700"
                : "border-charcoal/15 text-charcoal-muted hover:border-charcoal/30"
            )}
          >
            {formatCOP(value)}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setSelected(-1)}
        className={cn(
          "mt-2 flex w-full items-center gap-2 rounded-xl border px-4 py-3 transition-all duration-200",
          isCustom
            ? "border-terracotta-500 bg-terracotta-50"
            : "border-charcoal/15 hover:border-charcoal/30"
        )}
      >
        <span className="text-sm font-medium text-charcoal-muted">$</span>
        <input
          inputMode="numeric"
          placeholder="Otro monto"
          value={custom}
          onFocus={() => setSelected(-1)}
          onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))}
          className="w-full bg-transparent text-sm font-semibold tracking-tight text-charcoal outline-none placeholder:font-normal placeholder:text-charcoal-muted"
          aria-label="Monto personalizado en pesos colombianos"
        />
      </button>

      <Button
        className="mt-4 w-full"
        disabled={amount <= 0}
        onClick={() =>
          alert(
            `¡Gracias por tu generosidad! Donación seleccionada: ${formatCOP(
              amount
            )}.`
          )
        }
      >
        Donar {amount > 0 ? formatCOP(amount) : "ahora"}
        <HeartHandshake size={18} />
      </Button>
    </div>
  );
}

export function GivingChannels() {
  return (
    <section id="ayudar" className="section-padding bg-alabaster bg-grain">
      <div className="container-content">
        <Reveal>
          <span className="eyebrow">Cómo ayudar hoy</span>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tightest text-charcoal sm:text-4xl lg:text-5xl">
            Dos formas de transformar una vida.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal-muted">
            Cada aporte, grande o pequeño, se convierte en cuidado tangible.
            Elige el camino que más resuene contigo.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Channel 1 — Donations + rewards */}
          <Reveal>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col rounded-3xl border border-charcoal/10 bg-white p-8 shadow-sm sm:p-10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta-50 text-terracotta-600">
                <HeartHandshake size={24} strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-charcoal">
                Donación individual
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">
                Aporta de forma única o recurrente. Como muestra de gratitud,
                los donadores reciben{" "}
                <span className="font-medium text-charcoal">
                  cupones de descuento exclusivos
                </span>{" "}
                en empresas aliadas como Agape.
              </p>

              <div className="mt-6 flex items-center gap-2 rounded-2xl bg-terracotta-50 px-4 py-3">
                <Sparkles
                  size={18}
                  className="shrink-0 text-terracotta-500"
                />
                <p className="text-xs font-medium text-terracotta-700">
                  Recompensa: cupones en aliados por cada donación.
                </p>
              </div>

              <div className="mt-auto pt-8">
                <DonationSelector />
              </div>
            </motion.div>
          </Reveal>

          {/* Channel 2 — Agape bracelets */}
          <Reveal delay={0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col rounded-3xl border border-charcoal/10 bg-charcoal p-8 text-white shadow-sm sm:p-10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-terracotta-300">
                <Gift size={24} strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">
                Pulseras Agape
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Lleva contigo un símbolo de cambio. Cada pulsera financia
                directamente vivienda, salud y nutrición para un adulto mayor en
                abandono.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "100% de las ganancias a la causa",
                  "Diseño artesanal colombiano",
                  "Impacto trazable y transparente",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 text-sm text-white/80"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-terracotta-400" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() =>
                    window.open(AGAPE_URL, "_blank", "noopener")
                  }
                >
                  Comprar una pulsera
                  <ArrowUpRight size={18} />
                </Button>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
