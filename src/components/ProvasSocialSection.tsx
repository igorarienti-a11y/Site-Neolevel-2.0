"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";

const placeholders = [
  { initials: "AL", name: "Aluno 01", role: "Herdeiro | Família empresarial" },
  { initials: "AL", name: "Aluno 02", role: "First-time Founder | Startup" },
  { initials: "AL", name: "Aluno 03", role: "Empreendedor | Indústria" },
];

export function ProvasSocialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden" style={{ background: "rgba(30,30,30,0.85)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(6,249,250,0.05), transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#06F9FA", fontFamily: "Sora, sans-serif" }}
          >
            Prova social
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mt-3"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Por que eles escolheram o Neolevel?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {placeholders.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="rounded-2xl border overflow-hidden group cursor-pointer"
              style={{
                background: "rgba(18,32,58,0.6)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="aspect-video flex items-center justify-center relative"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "rgba(6,249,250,0.15)",
                    border: "1px solid rgba(6,249,250,0.25)",
                  }}
                >
                  <Play size={22} style={{ color: "#06F9FA", marginLeft: 2 }} />
                </div>
                <div
                  className="absolute inset-0 flex items-end p-4"
                  style={{
                    background: "linear-gradient(to top, rgba(18,32,58,0.7), transparent)",
                  }}
                >
                  <span className="text-xs text-[#D9D9D9]/50">Depoimento em breve</span>
                </div>
              </div>

              <div className="p-5 flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: "rgba(6,249,250,0.1)",
                    color: "#06F9FA",
                    fontFamily: "Sora, sans-serif",
                  }}
                >
                  {p.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white" style={{ fontFamily: "Sora, sans-serif" }}>
                    {p.name}
                  </div>
                  <div className="text-xs text-[#D9D9D9]/50 mt-0.5">{p.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
