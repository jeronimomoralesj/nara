"use client";

import * as React from "react";
import { useFormState } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, CheckCircle2, FileCheck2, ShieldCheck, TrendingUp } from "lucide-react";
import { registerCompany, type FormState } from "@/lib/actions";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/utils";

const initialState: FormState | null = null;

const sectors = [
  "Comercio",
  "Servicios",
  "Manufactura",
  "Tecnología",
  "Alimentos",
  "Salud",
  "Construcción",
  "Otro",
];

const benefits = [
  {
    icon: FileCheck2,
    title: "Certificados de donación",
    desc: "Deducciones tributarias respaldadas y trazables.",
  },
  {
    icon: TrendingUp,
    title: "Reputación con propósito",
    desc: "Comunica un compromiso real y medible.",
  },
  {
    icon: ShieldCheck,
    title: "Impacto verificado",
    desc: "Informes periódicos del destino de cada aporte.",
  },
];

export function PymeSection() {
  const [state, formAction] = useFormState(registerCompany, initialState);

  return (
    <section id="pymes" className="section-padding bg-charcoal text-white">
      <div className="container-content">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Pitch */}
          <div className="lg:col-span-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-blue-300">
                Alianzas con propósito · PYMEs
              </span>
            </Reveal>
            <TextReveal
              as="h2"
              text="Tu empresa también puede dejar huella."
              highlight={["huella."]}
              className="mt-6 font-display text-3xl font-light tracking-tightest sm:text-5xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/60">
                Estamos abriendo la siguiente fase: paquetes de impacto social
                para pequeñas y medianas empresas colombianas, con beneficios
                tributarios certificados. Únete a la lista fundadora.
              </p>
            </Reveal>

            <div className="mt-10 space-y-4">
              {benefits.map((b, i) => (
                <Reveal key={b.title} delay={0.15 + i * 0.08}>
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-blue-300">
                      <b.icon size={20} strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold">{b.title}</h3>
                      <p className="mt-0.5 text-sm text-white/55">{b.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm sm:p-10">
                <AnimatePresence mode="wait">
                  {state?.ok ? (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <motion.span
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400"
                      >
                        <CheckCircle2 size={34} />
                      </motion.span>
                      <h3 className="mt-6 font-display text-2xl">
                        ¡Bienvenidos al ecosistema!
                      </h3>
                      <p className="mt-2 max-w-sm text-sm text-white/60">
                        {state.message}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      action={formAction}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex items-center gap-2 text-blue-300">
                        <Building2 size={20} />
                        <span className="text-sm font-medium uppercase tracking-[0.16em]">
                          Postula tu empresa
                        </span>
                      </div>

                      <div className="mt-6 space-y-3">
                        <DarkField name="company" placeholder="Nombre de la empresa" error={state?.fieldErrors?.company} />
                        <DarkField name="contact" placeholder="Persona de contacto" error={state?.fieldErrors?.contact} />
                        <DarkField name="email" type="email" placeholder="Correo corporativo" error={state?.fieldErrors?.email} />
                        <DarkField name="phone" type="tel" placeholder="Celular" error={state?.fieldErrors?.phone} />

                        <div>
                          <select
                            name="sector"
                            defaultValue=""
                            aria-label="Sector"
                            className={cn(
                              "h-12 w-full rounded-2xl border border-white/15 bg-white/5 px-4 text-sm text-white outline-none transition-all duration-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10",
                              state?.fieldErrors?.sector && "border-red-400/60"
                            )}
                          >
                            <option value="" disabled className="text-charcoal">
                              Selecciona tu sector
                            </option>
                            {sectors.map((s) => (
                              <option key={s} value={s} className="text-charcoal">
                                {s}
                              </option>
                            ))}
                          </select>
                          {state?.fieldErrors?.sector && (
                            <p className="mt-1 px-1 text-xs text-red-400">
                              {state.fieldErrors.sector}
                            </p>
                          )}
                        </div>
                      </div>

                      {state && !state.ok && state.message && (
                        <p className="mt-3 text-sm text-red-400">{state.message}</p>
                      )}

                      <div className="mt-6">
                        <SubmitButton pendingLabel="Enviando…">
                          Unir mi empresa
                        </SubmitButton>
                        <p className="mt-3 text-center text-xs text-white/40">
                          Te contactaremos para diseñar tu paquete de impacto.
                        </p>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function DarkField({
  name,
  placeholder,
  type = "text",
  error,
}: {
  name: string;
  placeholder: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        aria-label={placeholder}
        aria-invalid={Boolean(error)}
        className={cn(
          "h-12 w-full rounded-2xl border border-white/15 bg-white/5 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/40 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10",
          error && "border-red-400/60"
        )}
      />
      {error && <p className="mt-1 px-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
