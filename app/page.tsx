import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { AgapeMission } from "@/components/sections/AgapeMission";
import { GivingChannels } from "@/components/sections/GivingChannels";
import { FutureVision } from "@/components/sections/FutureVision";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AgapeMission />
        <GivingChannels />
        <FutureVision />
      </main>
      <Footer />
    </>
  );
}
