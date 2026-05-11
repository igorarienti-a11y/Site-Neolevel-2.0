import { Metadata } from "next";
import { LPHero } from "@/components/LPHero";
import { LPParaQuem } from "@/components/LPParaQuem";
import { LPDiferenciais } from "@/components/LPDiferenciais";
import { LPMentores } from "@/components/LPMentores";
import { LPEstrutura } from "@/components/LPEstrutura";
import { LPProof } from "@/components/LPProof";
import { LPFAQ } from "@/components/LPFAQ";
import { LPForm } from "@/components/LPForm";

export const metadata: Metadata = {
  title: "Neolevel — Business School para Jovens Líderes | FIESC",
  description:
    "De jovem ambicioso a líder de alta performance. Business School exclusiva para jovens de 17 a 30 anos, com chancela FIESC. 25 vagas por turma.",
  robots: { index: false, follow: false },
};

export default function LPPage() {
  return (
    <main style={{ position: "relative" }}>
      <LPHero />
      <LPParaQuem />
      <LPDiferenciais />
      <LPMentores />
      <LPEstrutura />
      <LPProof />
      <LPFAQ />
      <LPForm />
    </main>
  );
}
