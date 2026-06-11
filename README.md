# Fundación Nara

Sitio web oficial de **Fundación Nara**, una entidad sin ánimo de lucro en Colombia dedicada a restaurar la dignidad de los adultos mayores en situación de abandono.

Una experiencia digital cinematográfica: storytelling humano, motion orgánico y formularios reales conectados a MongoDB.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **MongoDB + Mongoose** — colecciones `Donor`, `CompanyLead`, `Post`
- **Server Actions** — validación con **Zod** y persistencia segura
- **Tailwind CSS** — sistema de diseño cálido y minimalista (acento terracota)
- **Framer Motion** — text-reveal por palabras, parallax, transiciones de página, micro-interacciones elásticas
- **Inter** (texto) + **Fraunces** (display editorial)

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Home cinematográfico: Hero con text-reveal, historia viva de Agape (showcase horizontal), feed de comunidad con modales, donación (widget Nequi + formulario), alianzas PYME |
| `/aliados` | Directorio de aliados — Agape como socio fundador + slots "Tu marca aquí" |
| `/historias` | Blog editorial asimétrico estilo revista |
| `/historias/[slug]` | Vista de artículo (SSG) |

## Estructura

```
app/
  layout.tsx              # Fuentes, metadata, Navbar + Footer globales
  template.tsx            # Transición de página (re-mount por navegación)
  page.tsx                # Home
  aliados/page.tsx
  historias/page.tsx
  historias/[slug]/page.tsx
  icon.svg / apple-icon.svg
components/
  Navbar.tsx · Footer.tsx · CopyButton.tsx
  motion/  TextReveal · Reveal · Parallax
  ui/      Button · Logo · SubmitButton
  home/    Hero · AgapeStory · CommunityFeed · DonateSection · PymeSection
  aliados/ AliadosView
  historias/ HistoriasView
lib/
  db.ts                   # Conexión Mongoose cacheada (modo demo sin URI)
  models/                 # Donor · CompanyLead · Post
  validators.ts           # Esquemas Zod
  actions.ts              # Server Actions (registerDonor, registerCompany)
  content.ts              # Historias + aliados (fuente tipada)
  utils.ts                # cn · formatCOP · formatDate
```

## Desarrollo

```bash
npm install
cp .env.example .env.local   # opcional — añade MONGODB_URI para persistir
npm run dev
```

### Base de datos (opcional)

Sin `MONGODB_URI`, los formularios funcionan en **modo demostración**: validan y
responden, pero no persisten. Para guardar de verdad, define en `.env.local`:

```
MONGODB_URI=mongodb+srv://usuario:clave@cluster/...
MONGODB_DB=fundacion_nara
```

Las donaciones se guardan en `Donors` y las PYMEs en `CompanyLeads`.

## Línea de donación directa

**310 660 5566** (Nequi / Daviplata) — con interacción "Copiar Número".

## Notas

- Imágenes Unsplash como marcador de posición (`next/image`); reemplázalas por
  fotografía propia.
- `lib/content.ts` refleja el esquema `Post` para migrar el blog a MongoDB sin
  tocar la capa de renderizado.
