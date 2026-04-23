"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Clock, Calendar, BookOpen, TrendingUp, ArrowRight } from "lucide-react";
import { Tilt3D } from "./Tilt3D";

const stats = [
  { icon: Calendar, value: "2", unit: "anos", label: "de formação" },
  { icon: Clock, value: "960h", unit: "", label: "carga horária/ano" },
  { icon: TrendingUp, value: "3x", unit: "", label: "por semana" },
  { icon: BookOpen, value: "19h", unit: "às 22h", label: "horário das aulas" },
];

const disciplinas = [
  { title: "Liderança e Soft Skills", desc: "Gestão de pessoas e inteligência emocional" },
  { title: "Marketing e Crescimento", desc: "Estratégias de mercado e autoridade de marca" },
  { title: "Finanças e Investimentos", desc: "Gestão financeira e análise de dados para decisões críticas" },
  { title: "IA nos Negócios", desc: "Automação e vantagem competitiva com Inteligência Artificial" },
  { title: "M&A e Sucessão", desc: "Estruturação para crescimento sustentável" },
  { title: "Estratégia Empresarial", desc: "Planejamento estratégico e execução de planos de crescimento" },
  { title: "Desenvolvimento de Projeto Próprio", desc: "Construção e desenvolvimento do seu negócio com acompanhamento especializado" },
  { title: "Conexão com o Mercado", desc: "Visitas a empresas para conhecer de perto o mercado e vivenciar a realidade empresarial" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function EstruturaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <section
      id="estrutura"
      className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "rgba(18,32,58,0.88)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(6,249,250,0.2), transparent)" }}
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
            Programa
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white mb-14"
          style={{ fontFamily: "Sora, sans-serif" } as React.CSSProperties}
        >
          Uma imersão de{" "}
          <span style={{ color: "#06F9FA" }}>2 anos</span>{" "}
          focada em alta performance.
        </motion.h2>

        <div >
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
            style={{ transformStyle: "preserve-3d" }}
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} variants={statVariants}>
                  <Tilt3D
                    className="rounded-2xl p-5 border text-center h-full"
                    intensity={10}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      borderColor: "rgba(255,255,255,0.07)",
                    }}
                  >
                    <Icon size={18} className="mx-auto mb-3" style={{ color: "#06F9FA" }} />
                    <div
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: "Sora, sans-serif" }}
                    >
                      {stat.value}
                      {stat.unit && (
                        <span className="text-base ml-1" style={{ color: "#06F9FA" }}>
                          {stat.unit}
                        </span>
                      )}
                    </div>
                    <div className="text-[#D9D9D9]/60 text-xs mt-1">{stat.label}</div>
                  </Tilt3D>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-2xl font-semibold text-white mb-8"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          Grade Curricular 2026
        </motion.h3>

        <div >
          <motion.div
            ref={gridRef}
            variants={containerVariants}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
            style={{ transformStyle: "preserve-3d" }}
          >
            {disciplinas.map((d, i) => (
              <motion.div
                key={d.title}
                variants={itemVariants}
                className="flex items-start gap-4 rounded-xl p-4 border transition-all duration-200 hover:border-[#06F9FA]/20 hover:bg-white/[0.04]"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(255,255,255,0.05)",
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{ background: "rgba(6,249,250,0.12)", color: "#06F9FA", fontFamily: "Sora, sans-serif" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm" style={{ fontFamily: "Sora, sans-serif" }}>
                    {d.title}
                  </div>
                  <div className="text-[#D9D9D9]/60 text-xs mt-0.5 leading-relaxed">{d.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 rounded-2xl p-6 border"
          style={{
            background: "rgba(6,249,250,0.04)",
            borderColor: "rgba(6,249,250,0.15)",
          }}
        >
          <p className="text-[#D9D9D9] text-sm leading-relaxed">
            <span className="text-white font-semibold">Aulas práticas incluídas:</span>{" "}
            Visitas a grandes empresas para ter aulas práticas e conhecer de perto processos e
            estratégias com grandes empreendedores. Disciplinas com 80h/aula ou 40h/aula +{" "}
            48h de projetos de negócios.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
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
            Garantir minha vaga
            <ArrowRight size={16} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
