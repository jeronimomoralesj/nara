"use client";

import * as React from "react";
import { useFormState } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Gift, Smartphone, Sparkles } from "lucide-react";
import { registerDonor, type FormState } from "@/lib/actions";
import { CopyButton } from "@/components/CopyButton";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn, formatCOP } from "@/lib/utils";

const NEQUI = "3106605566";
const NEQUI_PRETTY = "310 660 5566";
const PRESETS = [20000, 50000, 100000];

const initialState: FormState | null = null;

export function DonateSection() {
  const [state, formAction] = useFormState(registerDonor, initialState);
  const [amount, setAmount] = React.useState<number>(50000);
  const [custom, setCustom] = React.useState<string>("");
  const isCustom = amount === -1;
  const effective = isCustom ? Number(custom.replace(/\D/g, "")) || 0 : amount;

  return (
    <section id="ayudar" className="section-padding bg-cream bg-grain">
      <div className="container-content">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">Cómo ayudar hoy</span>
          </Reveal>
          <TextReveal
            as="h2"
            text="Tu aporte se vuelve un plato, una cama, un abrazo."
            highlight={["abrazo."]}
            className="mt-4 font-display text-3xl font-light tracking-tightest text-charcoal sm:text-5xl"
          />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Nequi / Daviplata premium widget */}
          <Reveal>
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-charcoal p-8 text-white sm:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-terracotta-500/20 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-terracotta-300">
                  <Smartphone size={20} />
                  <span className="text-sm font-medium uppercase tracking-[0.18em]">
                    Donación directa
                  </span>
                </div>
                <p className="mt-6 text-sm text-white/60">
                  Transfiere desde tu celular a nuestra línea
                </p>

                <div className="mt-3 flex items-end gap-3">
                  <span className="font-display text-4xl font-normal tracking-tight sm:text-5xl">
                    {NEQUI_PRETTY}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                    Nequi
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                    Daviplata
                  </span>
                </div>

                <div className="mt-7">
                  <CopyButton
                    value={NEQUI}
                    label="Copiar Número"
                    className="bg-terracotta-500 hover:bg-terracotta-600"
                  />
                </div>
              </div>

              <div className="relative mt-auto pt-10">
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Sparkles size={18} className="mt-0.5 shrink-0 text-terracotta-300" />
                  <p className="text-sm leading-relaxed text-white/70">
                    Al registrar tu donación recibes{" "}
                    <span className="font-medium text-white">
                      cupones de descuento exclusivos
                    </span>{" "}
                    en Agape y futuras marcas aliadas.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Donor form */}
          <Reveal delay={0.1}>
            <div className="card-soft relative flex h-full flex-col p-8 sm:p-10">
              <AnimatePresence mode="wait">
                {state?.ok ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-1 flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500"
                    >
                      <CheckCircle2 size={34} />
                    </motion.span>
                    <h3 className="mt-6 font-display text-2xl text-charcoal">
                      ¡Gracias de corazón!
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-charcoal-muted">
                      {state.message} Pronto recibirás tus cupones de aliados en
                      tu correo.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    action={formAction}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-1 flex-col"
                  >
                    <div className="flex items-center gap-2 text-terracotta-600">
                      <Gift size={20} />
                      <span className="text-sm font-medium uppercase tracking-[0.16em]">
                        Registra tu donación
                      </span>
                    </div>

                    {/* Amount selector */}
                    <div className="mt-6 grid grid-cols-3 gap-2">
                      {PRESETS.map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            setAmount(value);
                            setCustom("");
                          }}
                          className={cn(
                            "rounded-2xl border px-2 py-3 text-sm font-semibold tracking-tight transition-all duration-200",
                            amount === value
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
                      onClick={() => setAmount(-1)}
                      className={cn(
                        "mt-2 flex w-full items-center gap-2 rounded-2xl border px-4 py-3 transition-all duration-200",
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
                        onFocus={() => setAmount(-1)}
                        onChange={(e) =>
                          setCustom(e.target.value.replace(/\D/g, ""))
                        }
                        className="w-full bg-transparent text-sm font-semibold tracking-tight text-charcoal outline-none placeholder:font-normal placeholder:text-charcoal-muted"
                        aria-label="Monto personalizado en pesos colombianos"
                      />
                    </button>

                    {/* Hidden fields submitted to the server action */}
                    <input type="hidden" name="amount" value={effective} />
                    <input type="hidden" name="method" value="nequi" />

                    {/* Contact fields */}
                    <div className="mt-5 space-y-3">
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
                    </div>

                    {state && !state.ok && state.message && (
                      <p className="mt-3 text-sm text-red-500">{state.message}</p>
                    )}

                    <div className="mt-auto pt-6">
                      <SubmitButton pendingLabel="Registrando…">
                        Donar{" "}
                        {effective > 0 ? formatCOP(effective) : "ahora"} con
                        gratitud
                      </SubmitButton>
                      <p className="mt-3 text-center text-xs text-charcoal-muted">
                        Tus datos se guardan de forma segura. Sin spam.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
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
