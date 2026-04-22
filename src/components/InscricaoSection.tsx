"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

const estagios = [
  "Ainda não tenho negócio, mas quero empreender",
  "Estou começando meu primeiro negócio",
  "Já tenho um negócio em operação (até 2 anos)",
  "Tenho um negócio consolidado e quero escalar",
  "Sou sucessor(a) de empresa familiar",
];

export function InscricaoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  const inputClass =
    "w-full bg-[#0E1A2B] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#06F9FA]/50 focus:ring-1 focus:ring-[#06F9FA]/30 transition-all duration-200";

  const labelClass =
    "block text-sm font-medium text-[#D9D9D9] mb-2";

  return (
    <section
      id="processo-seletivo"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "rgba(14,26,43,0.95)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 100%, rgba(6,249,250,0.05), transparent 70%)",
        }}
      />

      <div className="max-w-2xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#06F9FA", fontFamily: "Sora, sans-serif" }}
          >
            Processo Seletivo
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mt-3"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Candidate-se agora
          </h2>
          <p className="text-[#D9D9D9]/60 text-sm mt-3 leading-relaxed">
            Vagas limitadas. Preencha o formulário e nossa equipe entrará em contato.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-2xl p-8"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(6,249,250,0.1)",
            boxShadow: "0 0 60px rgba(6,249,250,0.04)",
          }}
        >
          {sent ? (
            <div className="text-center py-10">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: "rgba(6,249,250,0.1)", border: "1px solid rgba(6,249,250,0.3)" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#06F9FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-bold mb-2" style={{ fontFamily: "Sora, sans-serif" }}>
                Candidatura enviada!
              </h3>
              <p className="text-[#D9D9D9]/60 text-sm">
                Nossa equipe entrará em contato em breve. Fique atento ao seu e-mail.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className={labelClass}>
                  Nome completo <span style={{ color: "#06F9FA" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Digite seu nome completo"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>
                    E-mail <span style={{ color: "#06F9FA" }}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seu@email.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Cidade <span style={{ color: "#06F9FA" }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Sua cidade"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>
                    Telefone / WhatsApp <span style={{ color: "#06F9FA" }}>*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(00) 00000-0000"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Idade <span style={{ color: "#06F9FA" }}>*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={17}
                    max={30}
                    placeholder="Ex: 22"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Em que estágio da sua jornada empreendedora você está hoje?{" "}
                  <span style={{ color: "#06F9FA" }}>*</span>
                </label>
                <select required className={inputClass} defaultValue="">
                  <option value="" disabled style={{ color: "rgba(255,255,255,0.3)", background: "#0E1A2B" }}>
                    Selecione
                  </option>
                  {estagios.map((e) => (
                    <option key={e} value={e} style={{ background: "#0E1A2B", color: "#fff" }}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Mensagem (opcional)</label>
                <textarea
                  rows={4}
                  placeholder="Conte-nos mais sobre você ou sua ideia..."
                  className={inputClass}
                  style={{ resize: "none" }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 mt-1 disabled:opacity-70"
                style={{ background: "#06F9FA", color: "#12203A" }}
                onMouseEnter={(e) => {
                  if (!loading) (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 30px rgba(6,249,250,0.35), 0 8px 32px rgba(6,249,250,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Enviar candidatura
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
