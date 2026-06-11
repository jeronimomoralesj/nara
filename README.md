# Fundación Nara

Sitio web oficial de **Fundación Nara**, una entidad sin ánimo de lucro en Colombia dedicada a restaurar la dignidad de los adultos mayores en situación de abandono.

## Stack

- **Next.js 14** (App Router, React 18, TypeScript)
- **Tailwind CSS** — sistema de diseño minimalista ultra-premium
- **Framer Motion** — micro-interacciones suaves
- **Lucide React** — iconografía

## Estructura

```
app/
  layout.tsx        # Root layout · fuente Inter · metadata SEO
  page.tsx          # Landing de una sola página
  globals.css       # Tokens de diseño + utilidades
components/
  Navbar.tsx
  ui/
    Button.tsx      # Botón reutilizable (primary/secondary/ghost)
    Reveal.tsx      # Animación de entrada al hacer scroll
  sections/
    Hero.tsx          # 1 · Hook emocional + CTAs
    AgapeMission.tsx  # 2 · Alianza con Agape + spotlight de producto
    GivingChannels.tsx# 3 · Donaciones (selector COP) + pulseras
    FutureVision.tsx  # 4 · Roadmap PYMEs + lista de espera
    Footer.tsx        # 5 · Footer legal y social
lib/
  utils.ts          # cn() + formatCOP()
```

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Notas

- Las imágenes usan `next/image` con dominios remotos de Unsplash como
  marcador de posición; reemplázalas por fotografía propia en `public/`.
- El selector de donación y la lista de espera son demostrativos
  (sin backend); conéctalos a una pasarela de pagos / CRM cuando esté listo.
- Paleta de acento: terracota sofisticada (`terracotta-500 #B85C38`).
```
