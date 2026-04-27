"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building, Lightbulb, ArrowRight } from "lucide-react";
import { Tilt3D } from "./Tilt3D";

const personas = [
  {
    icon: Building,
    tag: "Herdeiros e Sucessores",
    title: "Herdeiros e Sucessores",
    body: "Prepare-se para honrar e expandir o patrimônio familiar com visão estratégica e governança moderna. Herança vem com expectativas — mas não vem com manual de instruções. O Neolevel entrega o método.",
    cta: "Quero preparar meu legado",
    delay: 0,
    photo: "/stock/herdeiro.jpeg",
    photoPosition: "center 25%",
  },
  {
    icon: Lightbulb,
    tag: "First-time Founders",
    title: "First-time Founders",
    body: "Transforme ideias em empresas lucrativas com método. Valide seu modelo de negócio, conquiste o mercado e aprenda com quem já construiu ecossistemas empresariais de sucesso.",
    cta: "Quero construir meu negócio",
    delay: 0.15,
    photo: "/stock/founder.jpeg",
    photoPosition: "center 20%",
  },
];

export function ParaQuemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="para-quem"
      className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "rgba(18,32,58,0.88)" }}
    >
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(6,249,250,0.2), transparent)" }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.65 }}
          
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
                initial={{ opacity: 0, y: 48 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt3D
                  className="h-full rounded-2xl border overflow-hidden"
                  intensity={7}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.07)",
                  }}
                >
                  {/* Photo header */}
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    <img
                      src={p.photo}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: p.photoPosition ?? "center" }}
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to bottom, rgba(6,14,25,0.15) 0%, rgba(6,14,25,0.85) 100%)",
                      }}
                    />
                    <div className="absolute bottom-4 left-5">
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: "rgba(6,249,250,0.15)", color: "#06F9FA", backdropFilter: "blur(8px)", border: "1px solid rgba(6,249,250,0.2)" }}
                      >
                        <Icon size={11} />
                        {p.tag}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-7">
                    <h3
                      className="text-2xl font-bold text-white mb-4"
                      style={{ fontFamily: "Sora, sans-serif" }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-[#D9D9D9]/75 leading-relaxed mb-8">{p.body}</p>
                    <a
                      href="#inscricao"
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3"
                      style={{ color: "#06F9FA" }}
                    >
                      {p.cta}
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </Tilt3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
