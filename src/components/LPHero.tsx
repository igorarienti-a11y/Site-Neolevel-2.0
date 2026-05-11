"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "17–30", label: "anos" },
  { value: "25", label: "vagas / turma" },
  { value: "1.200h", label: "de formação" },
  { value: "2", label: "anos" },
];

export function LPHero() {
  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{ background: "#080f1a", minHeight: "100dvh" }}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 grid-lines opacity-40" />

      {/* Central glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(6,249,250,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Top edge glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(6,249,250,0.4), transparent)" }}
      />

      {/* Logo */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-8">
        <Image
          src="/neolevel-logo.png"
          alt="NEOLEVEL"
          width={120}
          height={32}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      {/* Main content — centered */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-16">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#06F9FA]/20 bg-[#06F9FA]/5 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#06F9FA] animate-pulse shrink-0" />
          <span
            className="text-[#06F9FA] text-xs font-semibold tracking-[0.25em] uppercase"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            NEOLEVEL × FIESC · Business School
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-bold leading-[1.05] tracking-tight"
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "clamp(2.4rem, 6vw, 5rem)",
            maxWidth: "14ch",
          }}
        >
          De jovem ambicioso{" "}
          <span style={{ color: "#06F9FA" }}>
            a quem você precisa ser.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-[#D9D9D9]/65 leading-relaxed mt-6"
          style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", maxWidth: "48ch" }}
        >
          A Business School que coloca você dentro de empresas reais, ao lado de mentores que construíram o que você quer construir.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10"
        >
          <a
            href="#inscricao"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base transition-all duration-200 hover:scale-[1.03]"
            style={{ background: "#06F9FA", color: "#080f1a" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 40px rgba(6,249,250,0.4), 0 8px 32px rgba(6,249,250,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Quero garantir minha vaga
            <ArrowRight size={18} />
          </a>
        </motion.div>

        {/* Urgency */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-4 text-[11px] tracking-widest uppercase"
          style={{ color: "rgba(6,249,250,0.35)" }}
        >
          Turma 2026 — apenas 25 vagas disponíveis
        </motion.p>

      </div>

      {/* Stats bar at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="relative z-10"
        style={{ borderTop: "1px solid rgba(6,249,250,0.1)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label + i}
              className="flex flex-col items-center justify-center py-5 px-4 text-center"
              style={{
                borderRight: i < stats.length - 1 ? "1px solid rgba(6,249,250,0.08)" : "none",
              }}
            >
              <span
                className="font-bold text-2xl"
                style={{ fontFamily: "Sora, sans-serif", color: "#06F9FA" }}
              >
                {s.value}
              </span>
              <span className="text-[10px] uppercase tracking-widest mt-1" style={{ color: "rgba(217,217,217,0.4)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
