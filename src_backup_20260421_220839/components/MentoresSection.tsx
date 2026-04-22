"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const mentores = [
  {
    name: "Thiago Quadros",
    role: "CEO TOTVS",
    tema: "Inteligência Artificial aplicada ao crescimento",
    initials: "TQ",
  },
  {
    name: "Claudio Grando",
    role: "CEO AUDACES",
    tema: "Gestão e visão de mercado global",
    initials: "CG",
  },
  {
    name: "Luiz Fernando Marca",
    role: "Empreendedor",
    tema: "Estruturação para crescimento e sucessão familiar",
    initials: "LF",
  },
  {
    name: "Patricia Santos",
    role: "Especialista Corporativa",
    tema: "Excelência e mentoria corporativa padrão Disney",
    initials: "PS",
  },
  {
    name: "Norberto Dias",
    role: "Especialista M&A",
    tema: "Especialista em M&A e resultados sênior",
    initials: "ND",
  },
  {
    name: "Luiz Henrique Herling",
    role: "Estrategista Financeiro",
    tema: "Estratégia financeira e tomada de decisão",
    initials: "LH",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export function MentoresSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="mentores" className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden" style={{ background: "rgba(30,30,30,0.85)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 0% 50%, rgba(6,249,250,0.05), transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
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
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-2xl"
          style={{ fontFamily: "Sora, sans-serif" }}
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
        >
          {mentores.map((mentor) => (
            <motion.div
              key={mentor.name}
              variants={itemVariants}
              className="card-hover rounded-2xl p-6 border group"
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
