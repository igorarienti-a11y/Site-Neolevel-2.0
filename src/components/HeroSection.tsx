"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const HeroOrb = dynamic(() => import("./HeroOrb").then((m) => ({ default: m.HeroOrb })), {
  ssr: false,
});

const headline = "A próxima geração de líderes está sendo formada aqui!";
const words = headline.split(" ");

export function HeroSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "rgba(14,26,43,0.6)", height: "100dvh", paddingTop: "72px", paddingBottom: "40px" }}
    >
      <div className="absolute inset-0 grid-lines" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(6,249,250,0.13) 0%, transparent 65%)",
        }}
      />

      <div className="hidden md:block"><HeroOrb /></div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #1E1E1E, transparent)" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col items-start gap-4 md:gap-5 w-full md:max-w-[52%]">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#06F9FA]/25 bg-[#06F9FA]/5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#06F9FA] animate-pulse shrink-0" />
            <span
              className="text-[#06F9FA] text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Business School · FIESC
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-[1.9rem] sm:text-[2.6rem] md:text-[3rem] lg:text-[3.6rem] font-bold leading-[1.15]"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            {words.map((word, i) => {
              const isHighlight = word === "líderes";
              return (
                <span
                  key={i}
                  className={`inline-block mr-[0.22em] ${isHighlight ? "neon-text-glow" : ""}`}
                  style={{ color: isHighlight ? "#06F9FA" : "#FFFFFF" }}
                >
                  {word}
                </span>
              );
            })}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: "easeOut" }}
            className="text-[#D9D9D9] text-sm sm:text-base leading-relaxed max-w-md"
          >
            Business School exclusiva para jovens empreendedores e sucessores que
            buscam escala, gestão de alta performance e networking de elite.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.5, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#inscricao"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "#06F9FA", color: "#12203A" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 0 30px rgba(6,249,250,0.35), 0 8px 32px rgba(6,249,250,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              Inicie sua formação agora
              <ArrowRight size={16} />
            </a>

            <a
              href="#diferenciais"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.15)", color: "#D9D9D9" }}
            >
              Conhecer o programa
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.9 }}
            className="flex items-center justify-start gap-10 sm:gap-16 flex-wrap mt-8 w-full"
          >
            {[
              { value: "17–30", label: "anos" },
              { value: "20", label: "vagas por turma" },
              { value: "960h", label: "por ano" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.0 + i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ fontFamily: "Sora, sans-serif", color: "#06F9FA" }}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-[#D9D9D9]/55 uppercase tracking-widest mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={20} style={{ color: "rgba(6,249,250,0.5)" }} />
      </motion.div>
    </section>
  );
}
