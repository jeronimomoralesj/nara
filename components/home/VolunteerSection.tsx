"use client";

import * as React from "react";
import { useFormState } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, HandHeart, Clock, Wrench, Users } from "lucide-react";
import { registerVolunteer, type FormState } from "@/lib/actions";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/utils";

const initialState: FormState | null = null;

const availabilityOptions = [
  "Fines de semana",
  "Entre semana (días)",
  "Noches",
  "Tiempo completo",
  "Eventualmente",
];

const howToHelp = [
  {
    icon: HandHeart,
    title: "Cuidado directo",
    desc: "Acompañamiento, visitas y apoyo emocional a personas en situación de vulnerabilidad.",
  },
  {
    icon: Wrench,
    title: "Tu oficio o profesión",
    desc: "Médicos, psicólogos, abogados, cocineros — cada habilidad suma.",
  },
  {
    icon: Clock,
    title: "Tu tiempo",
    desc: "Con tan solo unas horas a la semana ya puedes cambiar una vida.",
  },
  {
    icon: Users,
    title: "Organización de eventos",
    desc: "Ayúdanos a movilizar a más personas y ampliar nuestro alcance.",
  },
];

export function VolunteerSection() {
  const [state, formAction] = useFormState(registerVolunteer, initialState);

  return (
    <section id="voluntario" className="section-padding bg-cream bg-grain">
      <div className="container-content">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — pitch */}
          <div className="lg:col-span-6">
            <Reveal>
              <span className="eyebrow">Únete al equipo · Voluntariado</span>
            </Reveal>
            <TextReveal
              as="h2"
              text="¿Quieres ayudar?"
              highlight={["ayudar?"]}
              className="mt-4 font-display text-3xl font-light tracking-tightest text-charcoal sm:text-5xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-charcoal-muted">
                No necesitas dinero para hacer la diferencia. Tu tiempo, tu
                talento y tu corazón son lo más valioso que puedes ofrecer.
                Cuéntanos quién eres y cómo quieres contribuir.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {howToHelp.map((item, i) => (
                <Reveal key={item.title} delay={0.12 + i * 0.07}>
                  <div className="flex items-start gap-4 rounded-3xl border border-charcoal/[0.07] bg-white p-5 shadow-[0_2px_20px_-8px_rgba(22,24,29,0.08)]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
                      <item.icon size={20} strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-charcoal">{item.title}</h3>
                      <p className="mt-0.5 text-sm leading-snug text-charcoal-muted">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <div className="card-soft relative flex flex-col p-8 sm:p-10">
                <AnimatePresence mode="wait">
                  {state?.ok ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <motion.span
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-500"
                      >
                        <CheckCircle2 size={34} />
                      </motion.span>
                      <h3 className="mt-6 font-display text-2xl text-charcoal">
                        ¡Gracias por tu corazón!
                      </h3>
                      <p className="mt-2 max-w-sm text-sm text-charcoal-muted">
                        {state.message}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      action={formAction}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col gap-4"
                    >
                      <div className="flex items-center gap-2 text-blue-600">
                        <HandHeart size={20} />
                        <span className="text-sm font-medium uppercase tracking-[0.16em]">
                          Ofrece tu ayuda
                        </span>
                      </div>

                      <div className="mt-2 space-y-3">
                        <Field
                          name="name"
                          placeholder="Tu nombre completo"
                          error={state?.fieldErrors?.name}
                        />
                        <Field
                          name="email"
                          type="email"
                          placeholder="Tu correo electrónico"
                          error={state?.fieldErrors?.email}
                        />
                        <Field
                          name="phone"
                          type="tel"
                          placeholder="Tu celular"
                          error={state?.fieldErrors?.phone}
                        />

                        <div>
                          <select
                            name="availability"
                            defaultValue=""
                            aria-label="Disponibilidad"
                            className={cn(
                              "h-12 w-full rounded-2xl border border-charcoal/15 bg-white px-4 text-sm text-charcoal outline-none transition-all duration-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10",
                              state?.fieldErrors?.availability && "border-red-300"
                            )}
                          >
                            <option value="" disabled className="text-charcoal-muted">
                              ¿Cuándo tienes tiempo?
                            </option>
                            {availabilityOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          {state?.fieldErrors?.availability && (
                            <p className="mt-1 px-1 text-xs text-red-500">
                              {state.fieldErrors.availability}
                            </p>
                          )}
                        </div>

                        <div>
                          <textarea
                            name="skills"
                            placeholder="¿En qué puedes ayudar? Cuéntanos sobre tus habilidades, profesión u oficio…"
                            aria-label="Habilidades y forma de ayudar"
                            rows={4}
                            aria-invalid={Boolean(state?.fieldErrors?.skills)}
                            className={cn(
                              "w-full resize-none rounded-2xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-all duration-300 placeholder:text-charcoal-muted/60 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10",
                              state?.fieldErrors?.skills && "border-red-300"
                            )}
                          />
                          {state?.fieldErrors?.skills && (
                            <p className="mt-1 px-1 text-xs text-red-500">
                              {state.fieldErrors.skills}
                            </p>
                          )}
                        </div>
                      </div>

                      {state && !state.ok && state.message && (
                        <p className="text-sm text-red-500">{state.message}</p>
                      )}

                      <div className="mt-2">
                        <SubmitButton pendingLabel="Enviando…">
                          Quiero ser voluntario
                        </SubmitButton>
                        <p className="mt-3 text-center text-xs text-charcoal-muted">
                          Te contactaremos en los próximos días. Sin compromiso.
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

function Field({
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
        className={cn("field", error && "field-error")}
      />
      {error && <p className="mt-1 px-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
