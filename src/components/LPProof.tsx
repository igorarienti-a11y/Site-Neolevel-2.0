"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote: "O Neolevel mudou completamente como eu enxergo a gestão do nosso negócio familiar. Aprendi a tomar decisões com dados, não só com intuição.",
    name: "Ana Carolina S.",
    context: "24 anos · Sucessora, empresa têxtil",
  },
  {
    quote: "Em 6 meses aprendi mais sobre liderança e estratégia do que em 2 anos de faculdade. A rede que construí aqui vale mais do que qualquer diploma.",
    name: "Pedro Mendes",
    context: "22 anos · Fundador, startup de tecnologia",
  },
];

export function LPProof() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section
      ref={ref}
      className="py-16 md:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "#060d17" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(6,249,250,0.12), transparent)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(6,249,250,0.05), transparent 70%)" }}
      />

      <div className="max-w-4xl mx-auto">

        {/* Pull quote — oversized, full width */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20"
        >
          <span
            className="block font-bold leading-none mb-6"
            style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(5rem, 12vw, 10rem)", color: "rgba(6,249,250,0.08)", lineHeight: 0.8 }}
            aria-hidden
          >
            "
          </span>
          <blockquote
            className="font-bold leading-[1.15] text-white"
            style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)", maxWidth: "18ch" }}
          >
            A rede que você constrói aqui é o ativo que mais vai importar em 10 anos.
          </blockquote>
          <div className="mt-5 flex items-center gap-3">
            <div className="w-6 h-px" style={{ background: "#06F9FA" }} />
            <span className="text-[#D9D9D9]/45 text-xs uppercase tracking-widest">Princípio NEOLEVEL</span>
          </div>
        </motion.div>

        {/* Stats — horizontal inline strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-0 mb-16 md:mb-20"
          style={{ borderTop: "1px solid rgba(6,249,250,0.08)", borderBottom: "1px solid rgba(6,249,250,0.08)" }}
        >
          {[
            { value: "+100", label: "Empresários e fundadores mentores" },
            { value: "US$ 5k", label: "Em VC para os melhores projetos" },
            { value: "25", label: "Vagas por turma" },
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              className="flex flex-col justify-center py-7 px-6 flex-1 min-w-[8rem]"
              style={{ borderRight: i < arr.length - 1 ? "1px solid rgba(6,249,250,0.08)" : "none" }}
            >
              <span
                className="font-bold leading-none"
                style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#06F9FA" }}
              >
                {stat.value}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#D9D9D9]/40 mt-2 leading-snug max-w-[14ch]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Testimonials — two alternating rows */}
        <div className="flex flex-col gap-6 md:gap-0">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              className="py-6 md:py-8"
              style={{ borderBottom: i < testimonials.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
            >
              <p
                className="text-[#D9D9D9]/80 leading-relaxed mb-4"
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.15rem)",
                  maxWidth: "56ch",
                  marginLeft: i === 1 ? "auto" : undefined,
                  textAlign: i === 1 ? "right" : "left",
                }}
              >
                "{t.quote}"
              </p>
              <div
                className="flex items-center gap-2"
                style={{ justifyContent: i === 1 ? "flex-end" : "flex-start" }}
              >
                <span
                  className="font-semibold text-sm text-white"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {t.name}
                </span>
                <span className="text-[#D9D9D9]/35 text-xs">· {t.context}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FIESC credibility */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center gap-4 mt-10 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <Image
            src="/logo-fiesc.png"
            alt="FIESC"
            width={72}
            height={36}
            style={{ objectFit: "contain", opacity: 0.55 }}
          />
          <p className="text-[#D9D9D9]/40 text-xs leading-relaxed max-w-[40ch]">
            Com chancela da <span style={{ color: "rgba(217,217,217,0.7)" }}>Federação das Indústrias de Santa Catarina</span> — o maior ecossistema empresarial do Sul do Brasil.
          </p>
          <a
            href="#inscricao"
            className="ml-auto inline-flex items-center gap-2 text-sm font-semibold shrink-0 hover:gap-3 transition-all duration-200"
            style={{ color: "#06F9FA" }}
          >
            Quero uma vaga
            <ArrowRight size={14} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
