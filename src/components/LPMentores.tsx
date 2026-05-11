"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const mentores = [
  {
    name: "Thiago Quadros",
    headline: "Lidera times de IA na TOTUS",
    tema: "Como usar Inteligência Artificial pra escalar negócios antes da concorrência",
    photo: "/mentor-thiago.jpg",
  },
  {
    name: "Claudio Grando",
    headline: "Fundador e presidente do conselho do Grupo AUDACES",
    tema: "O que separa uma empresa que dura décadas de uma que fecha em 3 anos",
    photo: "/mentor-claudio.png",
  },
  {
    name: "Luiz Fernando Marca",
    headline: "Criador do Sistema Orbis",
    tema: "Como estruturar crescimento e sucessão familiar sem destruir o que foi construído",
    photo: "/mentor-luiz-fernando.jpg",
  },
  {
    name: "Patricia Santos",
    headline: "Especialista em gestão emocional e experiência — padrão Disney",
    tema: "Liderança que retém pessoas e cria culturas que crescem junto com o negócio",
    photo: "/mentor-patricia.jpg",
  },
  {
    name: "Norberto Dias",
    headline: "2 M&As, 30 anos C-level, analista de inovação",
    tema: "Como avaliar, adquirir e integrar negócios — e não perder dinheiro nisso",
    photo: "/mentor-norberto.png",
  },
  {
    name: "Luiz Henrique Herling",
    headline: "Fundador e CEO da SEL Logística",
    tema: "Estratégia financeira para quem quer escalar sem quebrar no caminho",
    photo: "/mentor-luiz-henrique.jpg",
  },
  {
    name: "Cristiano Chaussard",
    headline: "Fundador da Flexy · Presidente da ABComm",
    tema: "E-commerce e empreendedorismo digital na prática",
    photo: "/mentor-cristiano.jpg",
  },
];

export function LPMentores() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section
      className="py-16 md:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "#080f1a" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 0% 60%, rgba(6,249,250,0.04), transparent 60%)" }}
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
          className="mb-14"
        >
          <span
            className="block text-xs font-semibold tracking-[0.22em] uppercase mb-5"
            style={{ color: "#06F9FA", fontFamily: "Sora, sans-serif" }}
          >
            Neomentores
          </span>
          <h2
            className="font-bold text-white leading-[1.1]"
            style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
          >
            Quem vai te ensinar{" "}
            <br className="hidden sm:block" />
            <span style={{ color: "#06F9FA" }}>já construiu o que você quer construir.</span>
          </h2>
          <p className="text-[#D9D9D9]/50 text-sm leading-relaxed mt-4 max-w-[50ch]">
            Nenhum professor universitário. Fundadores, CEOs e executivos que ensinam a partir do que viveram, não do que leram.
          </p>
        </motion.div>

        {/* Mentor rows — table-style horizontal layout */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {mentores.map((mentor, i) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.07 }}
              className="flex items-center gap-4 sm:gap-6 py-5 group"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Avatar */}
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0"
                style={{ border: "1px solid rgba(6,249,250,0.15)" }}
              >
                <Image
                  src={mentor.photo}
                  alt={mentor.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name + headline */}
              <div className="w-40 sm:w-52 shrink-0">
                <div
                  className="text-white font-semibold text-sm leading-snug"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {mentor.name}
                </div>
                <div className="text-[#D9D9D9]/40 text-xs mt-0.5 leading-snug">
                  {mentor.headline}
                </div>
              </div>

              {/* Topic — hidden on very small screens */}
              <div
                className="flex-1 hidden sm:flex items-center gap-2 rounded-lg px-3 py-2"
                style={{ background: "rgba(6,249,250,0.04)", border: "1px solid rgba(6,249,250,0.07)" }}
              >
                <span className="text-[#06F9FA] text-xs font-medium shrink-0">Vai te ensinar:</span>
                <span className="text-[#D9D9D9]/60 text-xs leading-snug line-clamp-2">{mentor.tema}</span>
              </div>

              {/* Arrow indicator */}
              <ArrowRight
                size={14}
                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: "#06F9FA" }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10"
        >
          <a
            href="#inscricao"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.03]"
            style={{ background: "#06F9FA", color: "#080f1a" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 32px rgba(6,249,250,0.35), 0 8px 24px rgba(6,249,250,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Aprender com esses mentores
            <ArrowRight size={15} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
