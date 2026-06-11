"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { stories, type Story } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export function HistoriasView() {
  const feature = stories.find((s) => s.feature) ?? stories[0];
  const rest = stories.filter((s) => s.slug !== feature.slug);

  return (
    <main className="bg-cream pt-28">
      <section className="px-6 sm:px-8 lg:px-12">
        <div className="container-content">
          <Reveal>
            <span className="eyebrow">Historias · Diario de impacto</span>
          </Reveal>
          <TextReveal
            as="h1"
            text="Historias que transmiten lo que las cifras no alcanzan."
            highlight={["transmiten"]}
            className="mt-4 max-w-4xl font-display text-4xl font-light tracking-tightest text-charcoal sm:text-6xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-charcoal-muted">
              Crónicas de dignidad recuperada, informes de transparencia y las
              voces de quienes hacen posible cada abrazo.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Feature */}
      <section className="px-6 pt-14 sm:px-8 lg:px-12">
        <div className="container-content">
          <Reveal>
            <Link href={`/historias/${feature.slug}`} className="group block">
              <article className="grid overflow-hidden rounded-[2rem] bg-white shadow-[0_2px_40px_-12px_rgba(26,23,20,0.12)] lg:grid-cols-2">
                <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto">
                  <Image
                    src={feature.coverImage}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] ease-organic group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-terracotta-50 px-3 py-1 font-medium text-terracotta-700">
                      {feature.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 text-charcoal-muted">
                      <Clock size={13} /> {feature.readingMinutes} min
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-3xl font-normal leading-tight tracking-tight text-charcoal sm:text-4xl">
                    {feature.title}
                  </h2>
                  <p className="mt-4 text-pretty leading-relaxed text-charcoal-muted">
                    {feature.excerpt}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-sm font-medium text-terracotta-600">
                    Leer la historia
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </div>
              </article>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Asymmetrical grid */}
      <section className="section-padding pt-16">
        <div className="container-content">
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
            {rest.map((story, i) => (
              <StoryCard key={story.slug} story={story} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/** Cards alternate column spans for a magazine rhythm. */
function StoryCard({ story, index }: { story: Story; index: number }) {
  // Pattern across rows of 12 cols: 7 / 5, then 5 / 7
  const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
  const span = spans[index % spans.length];
  const tall = span.includes("7");

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`group ${span}`}
    >
      <Link href={`/historias/${story.slug}`} className="block">
        <div
          className={`relative w-full overflow-hidden rounded-[1.75rem] bg-charcoal/5 ${
            tall ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1.1s] ease-organic group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium text-charcoal backdrop-blur">
            {story.tag}
          </span>
        </div>
        <div className="mt-5">
          <div className="flex items-center gap-3 text-xs text-charcoal-muted">
            <span className="inline-flex items-center gap-1">
              <Clock size={13} /> {story.readingMinutes} min
            </span>
            <span>·</span>
            <span>{formatDate(story.date)}</span>
          </div>
          <h3 className="mt-2 font-display text-2xl font-normal leading-snug tracking-tight text-charcoal transition-colors group-hover:text-terracotta-600">
            {story.title}
          </h3>
          <p className="mt-2 text-pretty leading-relaxed text-charcoal-muted">
            {story.excerpt}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
