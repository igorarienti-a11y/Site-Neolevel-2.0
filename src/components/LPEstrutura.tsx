"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const disciplinas = [
  { num: "01", title: "Liderança e Soft Skills", outcome: "Gerir pessoas, dar e receber feedback, liderar sem precisar de autoridade formal" },
  { num: "02", title: "Marketing e Crescimento", outcome: "Construir presença de marca e estratégias de aquisição que funcionam no seu mercado" },
  { num: "03", title: "Finanças e Investimentos", outcome: "Tomar decisões financeiras com dados — e parar de gerir o negócio no feeling" },
  { num: "04", title: "IA nos Negócios", outcome: "Automatizar o que pode ser automatizado e usar IA como vantagem competitiva real" },
  { num: "05", title: "M&A e Sucessão", outcome: "Estruturar crescimento e transições sem destruir o que foi construído" },
  { num: "06", title: "Estratégia Empresarial", outcome: "Sair com um plano de negócio estruturado e executável — não um slide bonito" },
  { num: "07", title: "Projeto Próprio", outcome: "Desenvolve seu negócio ao longo dos 2 anos com acompanhamento direto dos mentores" },
  { num: "08", title: "Conexão com o Mercado", outcome: "Visitas a grandes empresas para ver de perto como as decisões reais são tomadas" },
];

const metaStats = [
  { value: "2", unit: "anos", label: "de imersão" },
  { value: "1.200", unit: "horas", label: "de formação" },
  { value: "25", unit: "vagas", label: "por turma" },
];

export function LPEstrutura() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  const listRef = useRef<HTMLDivElement>(null);
  const listInView = useInView(listRef, { once: true, amount: 0.08 });

  return (
    <section
      className="py-16 md:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "#0a1525" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(6,249,250,0.1), transparent)" }}
      />

      <div className="max-w-5xl mx-auto" ref={ref}>

        {/* Header */}
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
            O Programa
          </span>
          <h2
            className="font-bold text-white leading-[1.1]"
            style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
          >
            2 anos que vão mudar{" "}
            <span style={{ color: "#06F9FA" }}>como você pensa e decide.</span>
          </h2>
        </motion.div>

        {/* Two-panel: big stats left | logistics right */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-14 rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(6,249,250,0.1)" }}
        >
          {metaStats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-8 px-6 text-center"
              style={{
                borderRight: i < metaStats.length - 1 ? "1px solid rgba(6,249,250,0.08)" : "none",
                background: i === 0 ? "rgba(6,249,250,0.04)" : "rgba(255,255,255,0.02)",
              }}
            >
              <div className="flex items-end gap-1 leading-none mb-1">
                <span
                  className="font-bold"
                  style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.5rem)", color: "#06F9FA" }}
                >
                  {s.value}
                </span>
                <span
                  className="font-semibold mb-1"
                  style={{ fontFamily: "Sora, sans-serif", fontSize: "1rem", color: "rgba(6,249,250,0.55)" }}
                >
                  {s.unit}
                </span>
              </div>
              <span className="text-[11px] uppercase tracking-widest text-[#D9D9D9]/40">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Info strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-14"
        >
          {[
            ["Frequência", "3× por semana"],
            ["Horário", "19h às 22h"],
            ["Local", "Academia FIESC · Florianópolis"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-[#D9D9D9]/35">{label}:</span>
              <span
                className="text-sm font-semibold text-white"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                {value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Curriculum — timeline style */}
        <div ref={listRef}>
          <div
            className="text-xs font-semibold tracking-[0.18em] uppercase mb-6"
            style={{ color: "rgba(6,249,250,0.5)", fontFamily: "Sora, sans-serif" }}
          >
            Grade do Programa
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[1.4rem] top-0 bottom-0 w-px hidden sm:block"
              style={{ background: "rgba(6,249,250,0.08)" }}
            />
            <div className="flex flex-col gap-0">
              {disciplinas.map((d, i) => (
                <motion.div
                  key={d.num}
                  initial={{ opacity: 0, x: -12 }}
                  animate={listInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="flex gap-4 sm:gap-6 py-4"
                  style={{ borderBottom: i < disciplinas.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                >
                  {/* Timeline dot */}
                  <div className="relative shrink-0 hidden sm:flex items-center justify-center w-11">
                    <div
                      className="w-2.5 h-2.5 rounded-full z-10"
                      style={{ background: i === 0 ? "#06F9FA" : "rgba(6,249,250,0.25)", border: i === 0 ? "none" : "1px solid rgba(6,249,250,0.3)" }}
                    />
                  </div>
                  {/* Mobile num */}
                  <span
                    className="shrink-0 sm:hidden text-xs font-bold tabular-nums pt-0.5"
                    style={{ color: "rgba(6,249,250,0.35)", fontFamily: "Sora, sans-serif", width: "1.8rem" }}
                  >
                    {d.num}
                  </span>
                  <div>
                    <div
                      className="font-semibold text-white text-sm leading-snug"
                      style={{ fontFamily: "Sora, sans-serif" }}
                    >
                      {d.title}
                    </div>
                    <div className="text-[#D9D9D9]/45 text-xs mt-1 leading-relaxed max-w-[56ch]">{d.outcome}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 rounded-2xl p-5"
          style={{ background: "rgba(6,249,250,0.04)", border: "1px solid rgba(6,249,250,0.1)" }}
        >
          <p className="text-[#D9D9D9] text-sm leading-relaxed">
            <span className="text-white font-semibold">Incluso: aulas dentro de grandes empresas.</span>{" "}
            Você vai sentar na mesa onde as decisões reais acontecem — e entender na prática o que nenhum caso acadêmico consegue ensinar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-8"
        >
          <a
            href="#inscricao"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.03]"
            style={{ background: "#06F9FA", color: "#0a1525" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 32px rgba(6,249,250,0.35), 0 8px 24px rgba(6,249,250,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Quero entrar nessa turma
            <ArrowRight size={15} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
