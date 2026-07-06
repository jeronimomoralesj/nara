"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Expand, X } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

const testimonios = [
  { src: "/videos/testimony-1.mov" },
  { src: "/videos/testimony-2.mov" },
  { src: "/videos/testimony-3.mp4" },
  { src: "/videos/testimony-4.mov" },
];

function VideoGridCard({
  src,
  index,
  onClick,
}: {
  src: string;
  index: number;
  onClick: () => void;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Autoplay muted when the card enters the viewport, pause on exit
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      aria-label={`Ver testimonio ${index + 1}`}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-organic group-hover:scale-105"
      />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/5 to-transparent" />

      {/* Expand hint — shows on hover/focus */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-lg backdrop-blur-sm">
          <Expand size={22} />
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/60 sm:text-xs">
          Testimonio {index + 1}
        </span>
      </div>
    </motion.button>
  );
}

function VideoModal({
  src,
  index,
  onClose,
}: {
  src: string;
  index: number;
  onClose: () => void;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    videoRef.current?.play().catch(() => {});
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      {/* Sized to fit portrait 9:16 within the viewport */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full"
        style={{ maxWidth: "min(92vw, calc(100dvh * 9 / 16 * 0.88))" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black">
          <video
            ref={videoRef}
            src={src}
            controls
            playsInline
            autoPlay
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
        <p className="mt-3 text-center text-xs font-semibold uppercase tracking-widest text-white/35">
          Testimonio {index + 1}
        </p>
      </motion.div>

      <button
        onClick={onClose}
        aria-label="Cerrar video"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
      >
        <X size={20} />
      </button>
    </motion.div>
  );
}

export function TestimoniosSection() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  return (
    <section id="testimonios" className="section-padding bg-white">
      <div className="container-content">
        <Reveal>
          <span className="eyebrow">Voces reales · Testimonios</span>
        </Reveal>
        <TextReveal
          as="h2"
          text="Ellos lo dicen mejor que nadie."
          highlight={["mejor"]}
          className="mt-4 font-display text-3xl font-light tracking-tightest text-charcoal sm:text-5xl"
        />
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-charcoal-muted">
            Cada historia que ves aquí es real. Son personas que encontraron en
            Fundación Nara un espacio de dignidad, calor humano y esperanza.
          </p>
        </Reveal>

        {/* 2×2 grid — same on all screen sizes */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
          {testimonios.map((t, i) => (
            <VideoGridCard
              key={i}
              src={t.src}
              index={i}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-4 text-center text-sm text-charcoal-muted">
            Toca cualquier video para verlo completo
          </p>
        </Reveal>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <VideoModal
            src={testimonios[activeIndex].src}
            index={activeIndex}
            onClose={() => setActiveIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
