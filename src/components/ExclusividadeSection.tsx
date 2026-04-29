"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, MessageSquare, CheckCircle2 } from "lucide-react";
import { Tilt3D } from "./Tilt3D";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Inscrição de Interesse",
    desc: "Preencha o formulário e demonstre sua intenção de fazer parte da próxima turma.",
  },
  {
    icon: MessageSquare,
    step: "02",
    title: "Entrevista de Alinhamento de Perfil",
    desc: "Uma conversa com nossa equipe para entender seus objetivos, ambições e histórico.",
  },
  {
    icon: CheckCircle2,
    step: "03",
    title: "Aprovação pelo Comitê de Mentores",
    desc: "Os mentores avaliam o potencial de cada candidato para garantir a qualidade da turma.",
  },
];

export function ExclusividadeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="exclusividade"
      className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "rgba(30,30,30,0.85)" }}
    >
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(6,249,250,0.07), transparent 65%)",
        }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-20" style={{ perspective: "1200px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#06F9FA", fontFamily: "Sora, sans-serif" }}
            >
              Exclusividade
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6 leading-tight"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Um Ambiente Exclusivo para os{" "}
              <span style={{ color: "#06F9FA" }}>Melhores</span>
            </h2>
            <p className="text-[#D9D9D9] leading-relaxed mb-4">
              O NEOLEVEL não é uma simples formação, é uma conquista. Limitamos nossas
              turmas para garantir profundidade nas mentorias e qualidade nas
              conexões.
            </p>
            <p className="text-[#D9D9D9]/70 text-sm leading-relaxed">
              Buscamos jovens com fome de resultado, visão de futuro e
              compromisso com a excelência.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col items-center justify-center"
          >
            <div
              className="text-[3.5rem] sm:text-[5.5rem] md:text-[10rem] font-bold leading-none neon-text-glow"
              style={{
                fontFamily: "Sora, sans-serif",
                color: "#06F9FA",
                filter: "drop-shadow(0 0 40px rgba(6,249,250,0.4))",
              }}
            >
              25
            </div>
            <div className="text-xl font-semibold text-[#D9D9D9] -mt-4" style={{ fontFamily: "Sora, sans-serif" }}>
              vagas por turma
            </div>
            <div className="text-[#D9D9D9]/50 text-sm mt-2">turmas limitadas e exclusivas</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10"
        >
          <h3
            className="text-2xl font-bold text-white mb-1"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            A Jornada Ingresso
          </h3>
          <p className="text-[#D9D9D9]/60 text-sm">3 etapas para entrar na próxima turma</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4" style={{ perspective: "1200px" }}>
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40, rotateX: 18, rotateY: i === 0 ? -5 : i === 2 ? 5 : 0 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0, rotateY: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt3D
                  className="relative h-full rounded-2xl p-6 border"
                  intensity={8}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.07)",
                  }}
                >
                  {i < steps.length - 1 && (
                    <div
                      className="hidden md:block absolute top-8 -right-2 w-4 h-px"
                      style={{ background: "rgba(6,249,250,0.2)" }}
                    />
                  )}

                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(6,249,250,0.1)" }}
                    >
                      <Icon size={18} style={{ color: "#06F9FA" }} />
                    </div>
                    <span
                      className="text-3xl font-bold"
                      style={{ color: "rgba(6,249,250,0.15)", fontFamily: "Sora, sans-serif" }}
                    >
                      {step.step}
                    </span>
                  </div>

                  <h4
                    className="font-semibold text-white mb-2"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    {step.title}
                  </h4>
                  <p className="text-[#D9D9D9]/65 text-sm leading-relaxed">{step.desc}</p>
                </Tilt3D>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="#inscricao"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "#06F9FA", color: "#12203A" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 30px rgba(6,249,250,0.35), 0 8px 32px rgba(6,249,250,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Iniciar minha inscrição
          </a>
        </motion.div>
      </div>
    </section>
  );
}
