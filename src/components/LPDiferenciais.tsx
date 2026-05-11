"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const items = [
  {
    num: "01",
    title: "Venture Capital real para os melhores projetos",
    body: "Os melhores projetos desenvolvidos ao longo do programa recebem até US$ 5.000 em aporte real. Você aprende construindo — e pode sair com investimento na mão.",
    accent: true,
  },
  {
    num: "02",
    title: "Mentores que fundaram empresas reais",
    body: "CEOs, fundadores e executivos que estão nas trincheiras do mercado. Não professores. Pessoas que já resolveram os problemas que você vai enfrentar.",
    accent: false,
  },
  {
    num: "03",
    title: "Você aprende no seu negócio, não em estudos de caso",
    body: "Cada disciplina é aplicada à sua realidade. Você não estuda em abstrato: desenvolve, itera e recebe feedback direto dos mentores ao longo dos 2 anos.",
    accent: false,
  },
  {
    num: "04",
    title: "A rede que você constrói vale mais do que o diploma",
    body: "25 jovens por turma, selecionados. Todos com a mesma ambição. A rede que você constrói aqui é o ativo que mais vai importar em 10 anos.",
    accent: false,
  },
  {
    num: "05",
    title: "Credencial da maior instituição empresarial de SC",
    body: "A Academia FIESC não é só nome em papel. É acesso a um ecossistema de empresas, eventos e conexões que a maioria dos jovens vai levar décadas construindo.",
    accent: false,
  },
];

export function LPDiferenciais() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section
      className="py-14 md:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "#0c1828" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 40% 50% at 100% 0%, rgba(6,249,250,0.05), transparent 70%)" }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(6,249,250,0.1), transparent)" }}
      />

      <div className="max-w-4xl mx-auto" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <span
            className="block text-xs font-semibold tracking-[0.22em] uppercase mb-5"
            style={{ color: "#06F9FA", fontFamily: "Sora, sans-serif" }}
          >
            O que nos separa
          </span>
          <h2
            className="font-bold text-white leading-[1.1]"
            style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(1.8rem, 6vw, 3.4rem)" }}
          >
            Cinco coisas que nenhuma
            <br />
            <span style={{ color: "#06F9FA" }}>faculdade vai te dar.</span>
          </h2>
        </motion.div>

        {/* Editorial numbered list */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {items.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.05 + i * 0.09 }}
              className="flex gap-4 sm:gap-8 md:gap-12 py-6 sm:py-8"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              {/* Number */}
              <span
                className="shrink-0 font-bold leading-none select-none"
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "clamp(2rem, 5vw, 5rem)",
                  color: item.accent ? "rgba(6,249,250,0.18)" : "rgba(255,255,255,0.05)",
                  lineHeight: 1,
                  marginTop: "-0.05em",
                  width: "2.8rem",
                  textAlign: "right",
                }}
              >
                {item.num}
              </span>

              <div className="flex-1 min-w-0">
                <h3
                  className="font-bold leading-snug mb-2 sm:mb-3"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "clamp(0.95rem, 2.5vw, 1.3rem)",
                    color: item.accent ? "#06F9FA" : "#fff",
                  }}
                >
                  {item.title}
                </h3>
                <p className="text-[#D9D9D9]/55 text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-8 sm:mt-10"
        >
          <a
            href="#inscricao"
            className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-4 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.03]"
            style={{ background: "#06F9FA", color: "#0c1828" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 32px rgba(6,249,250,0.35), 0 8px 24px rgba(6,249,250,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Quero fazer parte
            <ArrowRight size={15} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
