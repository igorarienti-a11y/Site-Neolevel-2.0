"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Tilt3D } from "./Tilt3D";

const mentores = [
  { name: "Thiago Quadros", role: "CEO TOTVS", tema: "Inteligência Artificial aplicada ao crescimento", initials: "TQ" },
  { name: "Claudio Grando", role: "CEO AUDACES", tema: "Gestão e visão de mercado global", initials: "CG" },
  { name: "Luiz Fernando Marca", role: "Empreendedor", tema: "Estruturação para crescimento e sucessão familiar", initials: "LF" },
  { name: "Patricia Santos", role: "Especialista Corporativa", tema: "Excelência e mentoria corporativa padrão Disney", initials: "PS" },
  { name: "Norberto Dias", role: "Especialista M&A", tema: "Especialista em M&A e resultados sênior", initials: "ND" },
  { name: "Luiz Henrique Herling", role: "Estrategista Financeiro", tema: "Estratégia financeira e tomada de decisão", initials: "LH" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export function MentoresSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="mentores"
      className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "rgba(30,30,30,0.85)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 0% 50%, rgba(6,249,250,0.05), transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24, rotateX: 20 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ perspective: 600 }}
          className="mb-4"
        >
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#06F9FA", fontFamily: "Sora, sans-serif" }}
          >
            Mentoria de elite
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28, rotateX: 15 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-2xl"
          style={{ fontFamily: "Sora, sans-serif", perspective: "800px" } as React.CSSProperties}
        >
          Seus mentores são empreendedores que construíram{" "}
          <span style={{ color: "#06F9FA" }}>ecossistemas gigantescos</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#D9D9D9] text-lg mb-14 max-w-xl"
        >
          Fundadores, CEOs e especialistas que vivenciaram todas as etapas de um
          negócio e possuem know-how para preparar os próximos líderes.
        </motion.p>

        <div style={{ perspective: "1400px" }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
            style={{ transformStyle: "preserve-3d" }}
          >
            {mentores.map((mentor) => (
              <motion.div key={mentor.name} variants={cardVariants}>
                <Tilt3D
                  className="h-full rounded-2xl p-6 border"
                  intensity={9}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                      style={{
                        background: "linear-gradient(135deg, rgba(6,249,250,0.2), rgba(18,32,58,0.8))",
                        border: "1px solid rgba(6,249,250,0.2)",
                        color: "#06F9FA",
                        fontFamily: "Sora, sans-serif",
                      }}
                    >
                      {mentor.initials}
                    </div>
                    <div>
                      <div
                        className="font-semibold text-white text-sm"
                        style={{ fontFamily: "Sora, sans-serif" }}
                      >
                        {mentor.name}
                      </div>
                      <div className="text-[#06F9FA] text-xs font-medium mt-0.5">
                        {mentor.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-[#D9D9D9]/65 text-sm leading-relaxed">
                    {mentor.tema}
                  </p>
                </Tilt3D>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <a
            href="#inscricao"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "#06F9FA", color: "#12203A" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 30px rgba(6,249,250,0.35), 0 8px 32px rgba(6,249,250,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Aprender com esses mentores
            <ArrowRight size={16} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
