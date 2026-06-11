"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden bg-alabaster bg-grain"
    >
      <div className="container-content grid items-center gap-12 px-6 pt-28 pb-16 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pt-20 lg:pb-0">
        {/* Copy */}
        <motion.div
          className="lg:col-span-6"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={item} className="eyebrow">
            Fundación Nara · Colombia
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tightest text-charcoal sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Devolvemos la dignidad a quienes el mundo{" "}
            <span className="text-terracotta-500">olvidó</span>.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-charcoal-muted"
          >
            En Colombia, miles de adultos mayores envejecen en el abandono.
            Nuestra misión es darles un hogar, cuidado médico y nutrición —
            porque cada vida merece terminar con dignidad.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button size="lg" onClick={() => scrollTo("ayudar")}>
              Apoyar Ahora
              <ArrowRight size={18} />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => scrollTo("mision")}
            >
              Conocer Más
            </Button>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-charcoal/10 pt-8"
          >
            {[
              { value: "100%", label: "de lo recaudado a su cuidado" },
              { value: "+30", label: "adultos mayores acompañados" },
              { value: "24/7", label: "atención y compañía" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-semibold tracking-tight text-charcoal">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-charcoal-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative lg:col-span-6"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-charcoal/5 shadow-2xl shadow-charcoal/10 sm:aspect-[3/4] lg:aspect-[4/5]">
            <Image
              src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1200&q=80"
              alt="Manos de un adulto mayor sostenidas con cariño"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
