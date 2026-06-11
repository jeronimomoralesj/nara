/**
 * Editorial + directory content sources.
 *
 * These typed arrays power `/historias` and `/aliados` today. They mirror the
 * MongoDB `Post` schema so the pages can later swap to `await getPosts()`
 * without changing the rendering layer.
 */

export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  tag: "Historias de Impacto" | "Transparencia" | "Comunidad" | "Aliados";
  readingMinutes: number;
  coverImage: string;
  author: string;
  date: string; // ISO
  feature?: boolean;
};

export const stories: Story[] = [
  {
    slug: "el-dia-que-rosa-volvio-a-sonreir",
    title: "El día que Rosa volvió a sonreír",
    excerpt:
      "A los 82 años, Rosa pasó tres inviernos sola. Hoy tiene un cuarto cálido, café en las mañanas y manos que la acompañan.",
    tag: "Historias de Impacto",
    readingMinutes: 5,
    coverImage:
      "https://images.unsplash.com/photo-1447710441604-5bdc41bc6517?auto=format&fit=crop&w=1400&q=80",
    author: "Equipo Nara",
    date: "2026-05-18",
    feature: true,
  },
  {
    slug: "como-una-pulsera-se-convierte-en-un-plato-de-comida",
    title: "Cómo una pulsera se convierte en un plato de comida",
    excerpt:
      "Seguimos el recorrido completo de una pulsera Agape: del taller artesanal a la mesa de don Efraín.",
    tag: "Transparencia",
    readingMinutes: 4,
    coverImage:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
    author: "Equipo Nara",
    date: "2026-04-29",
  },
  {
    slug: "voluntarios-las-manos-detras-del-abrazo",
    title: "Voluntarios: las manos detrás del abrazo",
    excerpt:
      "Conoce a quienes dedican sus sábados a leer, caminar y escuchar. La compañía también es cuidado.",
    tag: "Comunidad",
    readingMinutes: 6,
    coverImage:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    author: "Equipo Nara",
    date: "2026-04-10",
  },
  {
    slug: "informe-de-impacto-primer-trimestre",
    title: "Informe de impacto: nuestro primer trimestre",
    excerpt:
      "Cada peso, contado. Cuántas comidas, cuántas consultas médicas y cuántas noches abrigadas logramos juntos.",
    tag: "Transparencia",
    readingMinutes: 3,
    coverImage:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    author: "Equipo Nara",
    date: "2026-03-22",
  },
  {
    slug: "agape-el-arte-de-tejer-esperanza",
    title: "Agape: el arte de tejer esperanza",
    excerpt:
      "Hablamos con los artesanos de Agape sobre el oficio, el hilo y la convicción de que un objeto puede cambiar una vida.",
    tag: "Aliados",
    readingMinutes: 5,
    coverImage:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=80",
    author: "Equipo Nara",
    date: "2026-03-05",
  },
];

export type Partner = {
  name: string;
  category: string;
  description: string;
  badges: string[];
  url?: string;
  accent: string; // tailwind gradient classes
  initials: string;
  founding?: boolean;
};

export const partners: Partner[] = [
  {
    name: "Agape",
    category: "Joyería artesanal con propósito",
    description:
      "El motor que enciende a Fundación Nara. Cada pulsera Agape se teje a mano y destina el 100% de sus ganancias a vivienda, salud y nutrición para adultos mayores en abandono. No es merchandising: es impacto que puedes llevar puesto.",
    badges: ["Socio Fundador", "100% Impacto", "Hecho en Colombia"],
    url: "https://agape-rust.vercel.app",
    accent: "from-terracotta-400 to-terracotta-600",
    initials: "AG",
    founding: true,
  },
];

/** Placeholder slots that invite future PYMEs to join the ecosystem. */
export const partnerSlots = 3;
