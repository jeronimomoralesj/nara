"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { partners, partnerSlots } from "@/lib/content";

export function AliadosView() {
  return (
    <main className="bg-cream pt-28">
      {/* Header */}
      <section className="px-6 sm:px-8 lg:px-12">
        <div className="container-content">
          <Reveal>
            <span className="eyebrow">Ecosistema de aliados</span>
          </Reveal>
          <TextReveal
            as="h1"
            text="Las marcas que eligen el lado humano."
            highlight={["humano."]}
            className="mt-4 max-w-4xl font-display text-4xl font-light tracking-tightest text-charcoal sm:text-6xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-charcoal-muted">
              Un directorio vivo de quienes hacen posible nuestra misión. Hoy lo
              encabeza Agape; mañana, tu empresa podría estar aquí.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Crown jewel — Agape */}
      <section className="section-padding pt-16">
        <div className="container-content space-y-6">
          {partners.map((partner) => (
            <Reveal key={partner.name}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="card-soft overflow-hidden"
              >
                <div className="grid lg:grid-cols-12">
                  {/* Visual / monogram */}
                  <div
                    className={`relative flex min-h-[260px] items-center justify-center bg-gradient-to-br ${partner.accent} p-10 lg:col-span-5`}
                  >
                    <span className="font-display text-7xl font-normal text-white/95">
                      {partner.initials}
                    </span>
                    {partner.founding && (
                      <span className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 backdrop-blur">
                        <BadgeCheck size={14} />
                        Socio Fundador
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 sm:p-10 lg:col-span-7">
                    <div className="flex flex-wrap items-center gap-2">
                      {partner.badges.map((badge) => (
                        <span
                          key={badge}
                          className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                        >
                          <Sparkles size={12} />
                          {badge}
                        </span>
                      ))}
                    </div>

                    <h2 className="mt-5 font-display text-4xl font-normal tracking-tight text-charcoal">
                      {partner.name}
                    </h2>
                    <p className="mt-1 text-sm font-medium uppercase tracking-[0.14em] text-charcoal-muted">
                      {partner.category}
                    </p>

                    <p className="mt-5 max-w-xl text-pretty leading-relaxed text-charcoal-muted">
                      {partner.description}
                    </p>

                    {partner.url && (
                      <Button asChild size="lg" className="mt-8">
                        <a href={partner.url} target="_blank" rel="noopener noreferrer">
                          Visitar {partner.name}
                          <ArrowUpRight size={18} />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}

          {/* Future PYME slots */}
          <div className="grid gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: partnerSlots }).map((_, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.a
                  href="/#pymes"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex min-h-[240px] flex-col items-center justify-center rounded-3xl border border-dashed border-charcoal/20 bg-white/40 p-8 text-center transition-colors hover:border-blue-300 hover:bg-white"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-charcoal/15 text-charcoal-muted transition-all duration-500 group-hover:rotate-90 group-hover:border-blue-400 group-hover:text-blue-500">
                    <Plus size={24} />
                  </span>
                  <p className="mt-5 font-display text-xl font-normal text-charcoal">
                    Tu marca aquí
                  </p>
                  <p className="mt-2 text-sm text-charcoal-muted">
                    Sé parte de la próxima generación de aliados con propósito.
                  </p>
                </motion.a>
              </Reveal>
            ))}
          </div>

          {/* CTA band */}
          <Reveal>
            <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-3xl bg-charcoal p-10 text-center text-white sm:flex-row sm:text-left">
              <div>
                <h3 className="font-display text-2xl font-normal sm:text-3xl">
                  ¿Lideras una empresa con corazón?
                </h3>
                <p className="mt-2 text-white/60">
                  Postula tu PYME y accede a beneficios tributarios certificados.
                </p>
              </div>
              <Button asChild size="lg" className="shrink-0">
                <a href="/#pymes">Quiero ser aliado</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
