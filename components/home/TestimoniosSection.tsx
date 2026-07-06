"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

const testimonios = [
  {
    src: "/videos/testimony-1.mov",
    poster: null,
  },
  {
    src: "/videos/testimony-2.mov",
    poster: null,
  },
  {
    src: "/videos/testimony-3.mp4",
    poster: null,
  },
  {
    src: "/videos/testimony-4.mov",
    poster: null,
  },
];

function VideoCard({ src, poster, index }: { src: string; poster: string | null; index: number }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [muted, setMuted] = React.useState(true);

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted((m) => !m);
  };

  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onEnded = () => setPlaying(false);
    el.addEventListener("ended", onEnded);
    return () => el.removeEventListener("ended", onEnded);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative aspect-[9/16] w-[240px] shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-charcoal shadow-[0_20px_60px_-15px_rgba(22,24,29,0.4)] sm:w-[280px]"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster ?? undefined}
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/20" />

      {/* Play / Pause */}
      <button
        onClick={toggle}
        aria-label={playing ? "Pausar" : "Reproducir"}
        className="absolute inset-0 flex items-center justify-center focus:outline-none"
      >
        <motion.span
          animate={{ scale: playing ? 0.85 : 1, opacity: playing ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-lg backdrop-blur"
        >
          <Play size={26} className="translate-x-0.5" />
        </motion.span>
      </button>

      {/* Controls bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4">
        {playing && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={toggle}
            aria-label="Pausar"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur"
          >
            <Pause size={16} />
          </motion.button>
        )}
        <button
          onClick={toggleMute}
          aria-label={muted ? "Activar sonido" : "Silenciar"}
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </motion.div>
  );
}

export function TestimoniosSection() {
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
      </div>

      <div className="mt-12">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 sm:px-8 lg:px-12 [scroll-padding-left:1.5rem]">
          {testimonios.map((t, i) => (
            <VideoCard key={i} src={t.src} poster={t.poster} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
