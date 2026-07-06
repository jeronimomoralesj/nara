"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/motion/TextReveal";
import { Aurora } from "@/components/motion/Aurora";
import { Magnetic } from "@/components/motion/Magnetic";
import { CountUp } from "@/components/motion/CountUp";

export function Hero() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative flex min-h-[85svh] items-center overflow-hidden bg-cream bg-grain pt-16"
    >
      <Aurora />
      <div className="container-content grid w-full items-center gap-10 px-6 pb-16 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:px-12">
        {/* Copy */}
        <motion.div style={{ y: copyY }} className="lg:col-span-7">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="eyebrow"
          >
            Fundación Nara · Colombia
          </motion.span>

          <div className="mt-6 font-display text-[2.6rem] font-light leading-[1.02] tracking-tightest text-charcoal sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
            <TextReveal text="Hay vidas que" as="span" delay={0.3} immediate className="block" />
            <TextReveal
              text="el mundo dejó de mirar."
              as="span"
              delay={0.55}
              immediate
              className="block"
              highlight={["mirar."]}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-charcoal-muted"
          >
            En Colombia, miles de personas viven en la calle o en el abandono:
            adultos mayores, familias vulnerables, personas sin hogar.
            Nosotros existimos para devolverles lo que nunca debieron perder:
            dignidad, cuidado y la certeza de que importan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Magnetic className="sm:inline-block">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="#ayudar">
                  Apoyar Ahora
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic strength={0.25} className="sm:inline-block">
              <Button asChild size="lg" variant="ghost" className="w-full sm:w-auto">
                <Link href="#historia">Conocer la historia</Link>
              </Button>
            </Magnetic>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.9 }}
            className="mt-14 border-t border-charcoal/10 pt-8"
          >
            <div>
              <dt className="font-display text-3xl font-normal tracking-tight text-charcoal">
                <CountUp value={100} suffix="%" />
              </dt>
              <dd className="mt-1 text-xs leading-snug text-charcoal-muted">
                de lo recaudado va directo a su cuidado
              </dd>
            </div>
          </motion.dl>
        </motion.div>

        {/* Image with parallax + gentle float */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-charcoal/5 shadow-[0_30px_80px_-20px_rgba(22,24,29,0.4)]"
          >
            <motion.div style={{ y: imageY }} className="absolute inset-[-10%]">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqKJdeMz5J0qnF0W3PicfhzLLxhHkyw8UFydsVD2s2Ke4YXTXs197eKV4&s=10"
                alt="Personas atendidas por Fundación Nara"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/85 p-4 backdrop-blur-md"
            >
              <p className="text-sm font-medium text-charcoal">
                "Pensé que nadie volvería a preguntar por mí."
              </p>
              <p className="mt-1 text-xs text-charcoal-muted">
                — Rosa, 82 años · Hoy en un hogar seguro
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-charcoal-muted lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Desliza</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.div>
    </section>
  );
}
