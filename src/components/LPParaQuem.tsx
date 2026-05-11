"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const mirrors = [
  "Você tem entre 17 e 30 anos e quer construir algo que dure",
  "É herdeiro de empresa familiar e sente o peso de uma transição que ninguém te preparou pra fazer",
  "Quer empreender mas não sabe como transformar ideia em negócio lucrativo",
  "Já tem um negócio rodando mas está no limite do que consegue resolver sozinho",
  "Sabe que a faculdade não está te preparando para o mundo real dos negócios",
  "Quer estar na mesma sala que outros jovens tão obcecados com resultados quanto você",
];

export function LPParaQuem() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      className="py-14 md:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "#070e1c" }}
    >
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
            Perfil do Neoleader
          </span>
          <h2
            className="font-bold text-white leading-[1.1]"
            style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(1.8rem, 6vw, 3.4rem)" }}
          >
            Leia cada linha
            <br />
            <span style={{ color: "#06F9FA" }}>e pergunte se é você.</span>
          </h2>
        </motion.div>

        {/* Manifesto rows */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {mirrors.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="flex items-start sm:items-center gap-4 sm:gap-6 py-4 sm:py-5 group cursor-default"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span
                className="shrink-0 text-xs sm:text-sm font-bold tabular-nums pt-0.5 sm:pt-0"
                style={{ color: "rgba(6,249,250,0.25)", fontFamily: "Sora, sans-serif", width: "1.8rem" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className="text-[#D9D9D9]/70 text-sm sm:text-base md:text-lg leading-snug flex-1 group-hover:text-white transition-colors duration-200"
                style={{ fontFamily: "Sora, sans-serif", fontWeight: 500 }}
              >
                {item}
              </p>
              <ArrowRight
                size={14}
                className="shrink-0 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: "#06F9FA" }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
        >
          <a
            href="#inscricao"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.03]"
            style={{ background: "#06F9FA", color: "#070e1c" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 32px rgba(6,249,250,0.35), 0 8px 24px rgba(6,249,250,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Me reconheci — quero uma vaga
            <ArrowRight size={15} />
          </a>
          <span className="text-[#D9D9D9]/35 text-xs text-center sm:text-left">
            Turma 2026 · apenas 25 vagas
          </span>
        </motion.div>

      </div>
    </section>
  );
}
