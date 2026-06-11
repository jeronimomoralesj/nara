import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { stories } from "@/lib/content";
import { formatDate } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const story = stories.find((s) => s.slug === params.slug);
  if (!story) return { title: "Historia no encontrada" };
  return {
    title: story.title,
    description: story.excerpt,
    openGraph: { images: [story.coverImage] },
  };
}

/**
 * Placeholder article body. When the `Post` collection is populated, swap the
 * lookup for `await Post.findOne({ slug })` and render `post.body`.
 */
const paragraphs = [
  "Hay historias que no caben en una estadística. La de hoy empieza con una puerta que llevaba demasiado tiempo cerrada y una persona que creyó que el mundo se había olvidado de su nombre.",
  "En Fundación Nara entendemos que la dignidad no es un lujo: es un derecho que no caduca con la edad. Por eso cada aporte que recibimos se convierte, sin desvíos, en algo tangible — una cama tibia, una consulta médica a tiempo, un plato servido con cariño.",
  "Nuestro compromiso con la transparencia es absoluto. Documentamos cada paso para que quienes confían en nosotros sepan exactamente dónde y cómo florece su generosidad.",
  "Gracias por leer hasta aquí. Compartir estas historias también es una forma de cuidar: ayuda a que más personas miren hacia quienes el mundo dejó de mirar.",
];

export default function StoryPage({ params }: Props) {
  const story = stories.find((s) => s.slug === params.slug);
  if (!story) notFound();

  const more = stories.filter((s) => s.slug !== story.slug).slice(0, 2);

  return (
    <main className="bg-cream pt-28">
      <article className="px-6 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-3xl">
          <Reveal>
            <Link
              href="/historias"
              className="inline-flex items-center gap-2 text-sm font-medium text-charcoal-muted transition-colors hover:text-charcoal"
            >
              <ArrowLeft size={16} /> Volver a Historias
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 flex items-center gap-3 text-xs">
              <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
                {story.tag}
              </span>
              <span className="inline-flex items-center gap-1 text-charcoal-muted">
                <Clock size={13} /> {story.readingMinutes} min de lectura
              </span>
              <span className="text-charcoal-muted">·</span>
              <span className="text-charcoal-muted">{formatDate(story.date)}</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-5 font-display text-4xl font-light leading-tight tracking-tightest text-charcoal sm:text-5xl">
              {story.title}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 text-pretty text-xl leading-relaxed text-charcoal-muted">
              {story.excerpt}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="container-content mt-12">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] bg-charcoal/5">
              <Image
                src={story.coverImage}
                alt={story.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 w-full max-w-3xl">
          <div className="space-y-6 text-pretty text-lg leading-relaxed text-charcoal/90">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.04 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-charcoal p-8 text-center text-white sm:p-10">
            <p className="font-display text-2xl font-normal">
              Una historia más puede empezar contigo.
            </p>
            <Link
              href="/#ayudar"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-blue-500 px-7 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              Apoyar ahora
            </Link>
          </div>
        </div>
      </article>

      {/* More stories */}
      <section className="section-padding">
        <div className="container-content">
          <h2 className="font-display text-2xl font-normal text-charcoal">
            Seguir leyendo
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {more.map((s) => (
              <Link key={s.slug} href={`/historias/${s.slug}`} className="group block">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-charcoal/5">
                  <Image
                    src={s.coverImage}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-organic group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-display text-xl font-normal text-charcoal transition-colors group-hover:text-blue-600">
                  {s.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
