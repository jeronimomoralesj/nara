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
      className="relative overflow-hidden bg-cream bg-grain pt-16"
    >
      <Aurora />
      <div className="container-content grid w-full items-center gap-8 px-6 pb-10 pt-10 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        {/* Copy */}
        <motion.div style={{ y: copyY }} className="lg:col-span-6">
          <div className="font-display text-[2.4rem] font-light leading-[1.02] tracking-tightest text-charcoal sm:text-5xl lg:text-6xl xl:text-[4.5rem]">
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
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
        </motion.div>

        {/* Image — horizontal, less tall */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-6"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-charcoal/5 shadow-[0_20px_60px_-16px_rgba(22,24,29,0.35)]">
            <motion.div style={{ y: imageY }} className="absolute inset-[-6%]">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqKJdeMz5J0qnF0W3PicfhzLLxhHkyw8UFydsVD2s2Ke4YXTXs197eKV4&s=10"
                alt="Personas atendidas por Fundación Nara"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
          </div>
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
