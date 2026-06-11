"use client";

import Image from "next/image";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Heart, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

type Post = {
  id: string;
  image: string;
  caption: string;
  author: string;
  likes: number;
  isVideo?: boolean;
  span?: string; // grid span classes
};

const posts: Post[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=900&q=80",
    caption: "Don Efraín estrenó su nueva habitación. Hoy duerme abrigado.",
    author: "@fundacionnara",
    likes: 412,
    isVideo: true,
    span: "sm:row-span-2",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80",
    caption: "Tarde de música y memorias compartidas.",
    author: "@fundacionnara",
    likes: 289,
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
    caption: "Voluntarias preparando el almuerzo del domingo.",
    author: "@fundacionnara",
    likes: 356,
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    caption: "Jornada médica: salud que llega a quien más la necesita.",
    author: "@fundacionnara",
    likes: 198,
    isVideo: true,
    span: "sm:col-span-2",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=900&q=80",
    caption: "Cada pulsera Agape, una sonrisa que vuelve.",
    author: "@agape",
    likes: 521,
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
    caption: "Manos que sostienen, historias que renacen.",
    author: "@fundacionnara",
    likes: 467,
  },
];

export function CommunityFeed() {
  const [active, setActive] = React.useState<Post | null>(null);

  return (
    <section className="section-padding bg-sand">
      <div className="container-content">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">Nuestra comunidad</span>
          </Reveal>
          <TextReveal
            as="h2"
            text="Rostros reales. Impacto real."
            highlight={["real."]}
            className="mt-4 font-display text-3xl font-light tracking-tightest text-charcoal sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-charcoal-muted">
              No son estadísticas: son personas con nombre, historia y futuro.
              Así se ve la dignidad cuando vuelve a casa.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 sm:grid-cols-3 lg:auto-rows-[260px]">
          {posts.map((post, i) => (
            <motion.button
              key={post.id}
              type="button"
              onClick={() => setActive(post)}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative overflow-hidden rounded-3xl bg-charcoal/5 text-left ${post.span ?? ""}`}
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-organic group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />

              {post.isVideo && (
                <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-charcoal backdrop-blur transition-transform duration-500 group-hover:scale-110">
                  <Play size={16} className="ml-0.5 fill-charcoal" />
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="line-clamp-2 text-sm font-medium text-white">
                  {post.caption}
                </p>
                <div className="mt-2 flex items-center gap-4 text-xs text-white/80">
                  <span className="inline-flex items-center gap-1">
                    <Heart size={13} className="fill-blue-400 text-blue-400" />
                    {post.likes}
                  </span>
                  <span>{post.author}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Cerrar"
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-charcoal backdrop-blur transition-colors hover:bg-white"
              >
                <X size={18} />
              </button>
              <div className="relative aspect-square w-full bg-charcoal/5">
                <Image
                  src={active.image}
                  alt={active.caption}
                  fill
                  sizes="448px"
                  className="object-cover"
                />
                {active.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-lg"
                    >
                      <Play size={26} className="ml-1 fill-charcoal" />
                    </motion.span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <p className="text-sm font-medium text-charcoal">
                  {active.caption}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-charcoal-muted">
                  <span className="inline-flex items-center gap-1">
                    <Heart size={14} className="fill-blue-500 text-blue-500" />
                    {active.likes}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle size={14} /> Comentar
                  </span>
                  <span className="ml-auto">{active.author}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
