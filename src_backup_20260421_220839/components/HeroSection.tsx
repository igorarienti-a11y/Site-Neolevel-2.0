"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const headline = "A próxima geração de líderes está sendo formada aqui!";
const words = headline.split(" ");

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "rgba(14,26,43,0.6)", minHeight: "100dvh", paddingTop: "80px", paddingBottom: "60px" }}
    >
      <div className="absolute inset-0 grid-lines" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(6,249,250,0.13) 0%, transparent 65%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #1E1E1E, transparent)" }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6 md:gap-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
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

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold leading-[1.08] px-2"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          {words.map((word, i) => {
            const isHighlight = word === "líderes";
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: "blur(10px)", y: 24 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.55, delay: 0.3 + i * 0.065, ease: "easeOut" }}
                className={`inline-block mr-[0.22em] ${isHighlight ? "neon-text-glow" : ""}`}
                style={{ color: isHighlight ? "#06F9FA" : "#FFFFFF" }}
              >
                {word}
              </motion.span>
            );
          })}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="text-[#D9D9D9] text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed"
        >
          Business School exclusiva para jovens empreendedores e sucessores que
          buscam escala, gestão de alta performance e networking de elite.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full"
        >
          <a
            href="#processo-seletivo"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
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
            <ArrowRight size={17} />
          </a>

          <a
            href="#diferenciais"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-white/5 w-full sm:w-auto justify-center"
            style={{ borderColor: "rgba(255,255,255,0.15)", color: "#D9D9D9" }}
          >
            Conhecer o programa
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="flex items-center justify-center gap-6 sm:gap-10 pt-2 flex-wrap"
        >
          {[
            { value: "17–30", label: "anos" },
            { value: "20", label: "vagas por turma" },
            { value: "960h", label: "por ano" },
          ].map((stat) => (
            <div key={stat.label} className="text-center min-w-[70px]">
              <div
                className="text-xl sm:text-2xl md:text-3xl font-bold"
                style={{ fontFamily: "Sora, sans-serif", color: "#06F9FA" }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs text-[#D9D9D9]/60 uppercase tracking-widest mt-0.5 whitespace-nowrap">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
