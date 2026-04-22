import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { DiferenciaisSection } from "@/components/DiferenciaisSection";
import { VideoSection } from "@/components/VideoSection";
import { ParaQuemSection } from "@/components/ParaQuemSection";
import { MentoresSection } from "@/components/MentoresSection";
import { EstruturaSection } from "@/components/EstruturaSection";
import { ExclusividadeSection } from "@/components/ExclusividadeSection";
import { FaqSection } from "@/components/FaqSection";
import { ProvasSocialSection } from "@/components/ProvasSocialSection";
import { Footer } from "@/components/Footer";
import { ScrollRibbon } from "@/components/ScrollRibbon";
import { InscricaoSection } from "@/components/InscricaoSection";

export default function Home() {
  return (
    <main style={{ position: "relative" }}>
      <ScrollRibbon />
      <Navbar />
      <HeroSection />
      <DiferenciaisSection />
      <VideoSection />
      <ParaQuemSection />
      <MentoresSection />
      <EstruturaSection />
      <ExclusividadeSection />
      <FaqSection />
      <ProvasSocialSection />
      <InscricaoSection />
      <Footer />
    </main>
  );
}
