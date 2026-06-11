import { Hero } from "@/components/home/Hero";
import { AgapeStory } from "@/components/home/AgapeStory";
import { CommunityFeed } from "@/components/home/CommunityFeed";
import { DonateSection } from "@/components/home/DonateSection";
import { PymeSection } from "@/components/home/PymeSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <AgapeStory />
      <CommunityFeed />
      <DonateSection />
      <PymeSection />
    </main>
  );
}
