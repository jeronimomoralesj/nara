import { Hero } from "@/components/home/Hero";
import { AgapeStory } from "@/components/home/AgapeStory";
import { TestimoniosSection } from "@/components/home/TestimoniosSection";
import { PymeSection } from "@/components/home/PymeSection";
import { VolunteerSection } from "@/components/home/VolunteerSection";
import { Marquee } from "@/components/motion/Marquee";

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

export default function Home() {
  return (
    <main>
      <Hero />

      <div className="border-y border-charcoal/10 bg-charcoal py-6 text-white">
        <Marquee items={values} />
      </div>

      <AgapeStory />
      <TestimoniosSection />
      <VolunteerSection />
      <PymeSection />
    </main>
  );
}
