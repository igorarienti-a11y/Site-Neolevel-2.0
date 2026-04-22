"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building, Lightbulb, ArrowRight } from "lucide-react";

const personas = [
  {
    icon: Building,
    tag: "Herdeiros e Sucessores",
    title: "Herdeiros e Sucessores",
    body: "Prepare-se para honrar e expandir o patrimônio familiar com visão estratégica e governança moderna. Herança vem com expectativas — mas não vem com manual de instruções. O Neolevel entrega o método.",
    cta: "Quero preparar meu legado",
    delay: 0,
    from: -40,
  },
  {
    icon: Lightbulb,
    tag: "First-time Founders",
    title: "First-time Founders",
    body: "Transforme ideias em empresas lucrativas com método. Valide seu modelo de negócio, conquiste o mercado e aprenda com quem já construiu ecossistemas empresariais de sucesso.",
    cta: "Quero construir meu negócio",
    delay: 0.15,
    from: 40,
  },
];

export function ParaQuemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="para-quem" className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden" style={{ background: "rgba(18,32,58,0.88)" }}>
      <div className="absolute inset-0 grid-lines opacity-30" />

      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(6,249,250,0.2), transparent)" }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#06F9FA", fontFamily: "Sora, sans-serif" }}
          >
            Perfil do aluno
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Para quem é o Neolevel?
          </h2>
          <p className="text-[#D9D9D9] text-lg max-w-xl mx-auto">
            Aprenda com quem já chegou onde você quer ir e encurte sua curva de
            aprendizado em anos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personas.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: p.from }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: p.delay, ease: "easeOut" }}
                className="card-hover rounded-2xl p-8 border group"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: "rgba(6,249,250,0.1)" }}
                >
                  <Icon size={22} style={{ color: "#06F9FA" }} />
                </div>

                <div
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{ background: "rgba(6,249,250,0.08)", color: "#06F9FA" }}
                >
                  {p.tag}
                </div>

                <h3
                  className="text-2xl font-bold text-white mb-4"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {p.title}
                </h3>

                <p className="text-[#D9D9D9]/75 leading-relaxed mb-8">{p.body}</p>

                <a
                  href="#processo-seletivo"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                  style={{ color: "#06F9FA" }}
                >
                  {p.cta}
                  <ArrowRight size={16} />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
