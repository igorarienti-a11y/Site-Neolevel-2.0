"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Loader2, Shield, Users, Clock } from "lucide-react";

const estagios = [
  "Ainda não tenho negócio, mas quero empreender",
  "Estou começando meu primeiro negócio",
  "Já tenho um negócio em operação (até 2 anos)",
  "Tenho um negócio consolidado e quero escalar",
  "Sou sucessor(a) de empresa familiar",
];

function getCookie(name: string): string {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : "";
}

function generateEventId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function getUtms(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const utms: Record<string, string> = {};
  keys.forEach((k) => { if (params.get(k)) utms[k] = params.get(k)!; });
  if (Object.keys(utms).length) sessionStorage.setItem("_utms", JSON.stringify(utms));
  const stored = sessionStorage.getItem("_utms");
  return stored ? JSON.parse(stored) : {};
}

function getClickIds(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const clickKeys = ["fbclid", "gclid", "ttclid", "msclkid", "gbraid", "wbraid"];
  const ids: Record<string, string> = {};
  clickKeys.forEach((k) => { if (params.get(k)) ids[k] = params.get(k)!; });
  if (Object.keys(ids).length) sessionStorage.setItem("_clickids", JSON.stringify(ids));
  const stored = sessionStorage.getItem("_clickids");
  return stored ? JSON.parse(stored) : {};
}

function getBrowserData(fullName: string) {
  const clickIds = getClickIds();
  const fbclid = clickIds.fbclid || "";
  let fbc = getCookie("_fbc");
  if (!fbc && fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  const nameParts = fullName.trim().split(/\s+/);
  return {
    event_id: generateEventId(),
    first_name: nameParts[0] || "",
    last_name: nameParts.slice(1).join(" ") || "",
    fbp: getCookie("_fbp"),
    fbc,
    fbclid,
    gclid: clickIds.gclid || "",
    gbraid: clickIds.gbraid || "",
    wbraid: clickIds.wbraid || "",
    ttclid: clickIds.ttclid || "",
    msclkid: clickIds.msclkid || "",
    page_url: window.location.href,
    referrer: document.referrer,
    user_agent: navigator.userAgent,
    language: navigator.language,
    screen: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    utms: getUtms(),
  };
}

export function LPForm() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cidade, setCidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [idade, setIdade] = useState("");
  const [estagio, setEstagio] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const browser = getBrowserData(nome);

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nome,
          email,
          phone: telefone,
          cidade,
          idade,
          estagio,
          message: mensagem,
          ...browser,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Lead", {}, { eventID: browser.event_id });
      }

      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({ event: "send_form" });
      }

      setSent(true);
    } catch (err: any) {
      setError(err.message || "Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-[#060d17] border border-white/[0.09] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#06F9FA]/40 focus:ring-1 focus:ring-[#06F9FA]/20 transition-all duration-200";

  const labelClass = "block text-xs font-medium text-[#D9D9D9]/60 mb-1.5 uppercase tracking-wider";

  return (
    <section
      id="inscricao"
      className="py-16 md:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "#060d17" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(6,249,250,0.05), transparent 70%)" }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(6,249,250,0.15), transparent)" }}
      />

      <div className="max-w-5xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — urgency copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-12"
          >
            <span
              className="block text-xs font-semibold tracking-[0.22em] uppercase mb-5"
              style={{ color: "#06F9FA", fontFamily: "Sora, sans-serif" }}
            >
              Jornada de Ingresso
            </span>

            <h2
              className="font-bold text-white leading-[1.1] mb-6"
              style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Garanta sua vaga
              <br />
              <span style={{ color: "#06F9FA" }}>na Turma 2026.</span>
            </h2>

            <p className="text-[#D9D9D9]/55 text-sm leading-relaxed mb-8 max-w-[40ch]">
              São <strong className="text-white/80">25 vagas por turma</strong> — e a seleção para 2026 está aberta agora. Preencha o formulário e nossa equipe entra em contato em até 24h.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {[
                { icon: Users, text: "Turma limitada a 25 jovens por ano" },
                { icon: Clock, text: "Resposta em até 24h úteis" },
                { icon: Shield, text: "Seus dados não serão compartilhados" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(6,249,250,0.07)", border: "1px solid rgba(6,249,250,0.12)" }}
                  >
                    <Icon size={14} style={{ color: "#06F9FA" }} />
                  </div>
                  <span className="text-[#D9D9D9]/65 text-sm">{text}</span>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl p-4 flex items-center gap-3"
              style={{ background: "rgba(6,249,250,0.04)", border: "1px solid rgba(6,249,250,0.1)" }}
            >
              <div
                className="w-2 h-2 rounded-full shrink-0 animate-pulse"
                style={{ background: "#06F9FA" }}
              />
              <p className="text-xs tracking-wide" style={{ color: "rgba(6,249,250,0.7)" }}>
                Processo seletivo em andamento — Turma 2026
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(6,249,250,0.1)",
                boxShadow: "0 0 60px rgba(6,249,250,0.04)",
              }}
            >
              {sent ? (
                <div className="text-center py-12">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "rgba(6,249,250,0.08)", border: "1px solid rgba(6,249,250,0.25)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#06F9FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3
                    className="text-white text-xl font-bold mb-3"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    Inscrição recebida.
                  </h3>
                  <p className="text-[#D9D9D9]/50 text-sm max-w-xs mx-auto leading-relaxed">
                    Nossa equipe vai entrar em contato em breve pelo WhatsApp ou e-mail. Você está um passo mais perto.
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
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>
                        WhatsApp <span style={{ color: "#06F9FA" }}>*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(00) 00000-0000"
                        className={inputClass}
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
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
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Estágio da sua jornada empreendedora <span style={{ color: "#06F9FA" }}>*</span>
                    </label>
                    <select
                      required
                      className={inputClass}
                      value={estagio}
                      onChange={(e) => setEstagio(e.target.value)}
                    >
                      <option value="" disabled style={{ color: "rgba(255,255,255,0.25)", background: "#060d17" }}>
                        Selecione
                      </option>
                      {estagios.map((e) => (
                        <option key={e} value={e} style={{ background: "#060d17", color: "#fff" }}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Mensagem (opcional)</label>
                    <textarea
                      rows={3}
                      maxLength={500}
                      placeholder="Conta um pouco sobre você ou sua ideia..."
                      className={inputClass}
                      style={{ resize: "none" }}
                      value={mensagem}
                      onChange={(e) => setMensagem(e.target.value)}
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-200 mt-1 disabled:opacity-70 hover:scale-[1.02]"
                    style={{ background: "#06F9FA", color: "#060d17" }}
                    onMouseEnter={(e) => {
                      if (!loading) (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 0 32px rgba(6,249,250,0.35), 0 8px 24px rgba(6,249,250,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                    }}
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        Garantir minha vaga agora
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Mini footer */}
      <p className="text-center text-[11px] text-[#D9D9D9]/20 mt-14">
        © {new Date().getFullYear()} Neolevel Business School · Programa com chancela FIESC
      </p>
    </section>
  );
}
