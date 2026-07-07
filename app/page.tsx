import { Hero } from "@/components/home/Hero";
import { AgapeStory } from "@/components/home/AgapeStory";
import { TestimoniosSection } from "@/components/home/TestimoniosSection";
import { PymeSection } from "@/components/home/PymeSection";
import { VolunteerSection } from "@/components/home/VolunteerSection";
import { FloatingAgapeButton } from "@/components/home/FloatingAgapeButton";
import { Marquee } from "@/components/motion/Marquee";
import { fetchProducts } from "@/lib/agape/products";

const values = [
  "Dignidad",
  "Vivienda",
  "Salud",
  "Nutrición",
  "Compañía",
  "Esperanza",
  "Amor",
  "Comunidad",
  "Solidaridad",
];

export default async function Home() {
  const agapeProducts = await fetchProducts(4);

  return (
    <main>
      <Hero />

      <div className="border-y border-charcoal/10 bg-charcoal py-6 text-white">
        <Marquee items={values} />
      </div>

      <AgapeStory products={agapeProducts} />
      <TestimoniosSection />
      <VolunteerSection />
      <PymeSection />
      <FloatingAgapeButton />
    </main>
  );
}
