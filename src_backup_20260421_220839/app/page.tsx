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
import { NetworkCanvas } from "@/components/NetworkCanvas";

export default function Home() {
  return (
    <>
      <NetworkCanvas />
      <main style={{ position: "relative", zIndex: 1 }}>
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
        <Footer />
      </main>
    </>
  );
}
