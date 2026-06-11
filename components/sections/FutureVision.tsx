"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Building2, Check, FileCheck2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  {
    icon: FileCheck2,
    title: "Beneficios tributarios",
    desc: "Deducciones de impuestos certificadas para tu empresa en Colombia.",
  },
  {
    icon: Building2,
    title: "Paquetes para PYMEs",
    desc: "Programas de impacto social diseñados a la medida de tu negocio.",
  },
  {
    icon: TrendingUp,
    title: "Reputación con propósito",
    desc: "Comunica un compromiso real y medible con tu comunidad.",
  },
];

function WaitlistForm() {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 flex w-full flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="pyme-email" className="sr-only">
        Correo corporativo
      </label>
      <input
        id="pyme-email"
        type="email"
        required
        placeholder="tu@empresa.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={done}
        className="h-14 flex-1 rounded-full border border-white/15 bg-white/5 px-6 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-terracotta-400 disabled:opacity-60"
      />
      <Button type="submit" size="lg" disabled={done}>
        {done ? (
          <>
            En la lista
            <Check size={18} />
          </>
        ) : (
          "Unirme a la lista"
        )}
      </Button>
    </form>
  );
}

export function FutureVision() {
  return (
    <section id="vision" className="bg-white px-6 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="container-content">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] bg-charcoal px-6 py-16 text-white sm:px-12 sm:py-20 lg:px-16">
            <div className="mx-auto max-w-3xl text-center">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-terracotta-300"
              >
                Próximamente
              </motion.span>

              <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tightest sm:text-4xl lg:text-5xl">
                Alianzas Corporativas para PYMEs en Colombia.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-balance text-lg leading-relaxed text-white/60">
                Estamos construyendo paquetes especializados de impacto social
                que permiten a las pequeñas y medianas empresas generar un
                cambio real mientras acceden a deducciones tributarias
                certificadas.
              </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left"
                >
                  <p.icon
                    size={22}
                    className="text-terracotta-300"
                    strokeWidth={1.75}
                  />
                  <h3 className="mt-4 text-base font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-snug text-white/55">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-12 max-w-xl text-center">
              <p className="text-sm font-medium text-white/80">
                ¿Lideras una PYME? Sé el primero en enterarte.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
