"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "Preciso já ter uma empresa para me inscrever?",
    a: "Não. O Neolevel foi feito exatamente para quem está antes disso — quem quer empreender do zero, quem está assumindo um negócio familiar, ou quem quer estruturar uma ideia que ainda está na cabeça. A metodologia acompanha você do ponto onde você está.",
  },
  {
    q: "Não tenho formação superior. Posso participar?",
    a: "Sim. Não há exigência de ensino superior ou qualquer formação anterior. O Neolevel é a porta de entrada para jovens que concluíram o ensino médio ou que já deram os primeiros passos na carreira. O único requisito é ambição e disposição pra aplicar o que aprender.",
  },
  {
    q: "As aulas são presenciais? Preciso estar em Florianópolis?",
    a: "As aulas acontecem presencialmente na Academia FIESC de Negócios, em Florianópolis/SC. A presença é parte da experiência — o networking com a turma e os mentores acontece nesses encontros. Se você não é de Florianópolis, vale a conversa com nosso time sobre sua situação.",
  },
  {
    q: "Quanto tempo por semana preciso dedicar?",
    a: "As aulas são 3 vezes por semana, das 19h às 22h — pensadas para quem trabalha ou empreende durante o dia. Fora as aulas, você vai dedicar tempo ao projeto prático do seu negócio, que é desenvolvido ao longo de todo o programa.",
  },
  {
    q: "Como funciona o aporte de até US$ 5 mil em Venture Capital?",
    a: "Ao final do programa, os melhores projetos desenvolvidos pelos Neoleaders são avaliados em banca. Os projetos com maior potencial recebem um aporte real de até US$ 5.000 em venture capital. A avaliação considera inovação, viabilidade e impacto de mercado.",
  },
  {
    q: "Qual o investimento para participar?",
    a: "O Neolevel tem diferentes condições de pagamento. Após preencher o formulário, nossa equipe entra em contato para entender sua situação e apresentar as opções disponíveis. Não existe uma única resposta — existe a resposta certa para o seu caso.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-5 text-left"
      >
        <span
          className="font-semibold text-white leading-snug flex-1"
          style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
        >
          {q}
        </span>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200"
          style={{
            background: open ? "rgba(6,249,250,0.12)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${open ? "rgba(6,249,250,0.2)" : "rgba(255,255,255,0.07)"}`,
          }}
        >
          {open
            ? <Minus size={11} style={{ color: "#06F9FA" }} />
            : <Plus size={11} style={{ color: "#D9D9D9" }} />
          }
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[#D9D9D9]/65 text-sm leading-relaxed max-w-[60ch]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function LPFAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section
      className="py-16 md:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "#0c1828" }}
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
          className="mb-14"
        >
          <span
            className="block text-xs font-semibold tracking-[0.22em] uppercase mb-5"
            style={{ color: "#06F9FA", fontFamily: "Sora, sans-serif" }}
          >
            Dúvidas
          </span>
          <h2
            className="font-bold text-white leading-[1.1]"
            style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
          >
            Respostas diretas
            <br />
            <span style={{ color: "#06F9FA" }}>para quem está considerando entrar.</span>
          </h2>
        </motion.div>

        {/* Accordion — borderless, rule-separated */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        {/* WhatsApp escape */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <p className="text-[#D9D9D9]/45 text-sm">
            Ficou com alguma dúvida? Nossa equipe responde no mesmo dia.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="https://wa.me/5548996690119"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "rgba(6,249,250,0.08)", color: "#06F9FA", border: "1px solid rgba(6,249,250,0.18)" }}
            >
              WhatsApp (48) 99669-0119
            </a>
            <a
              href="#inscricao"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "#06F9FA", color: "#0c1828" }}
            >
              Ir para inscrição
              <ArrowRight size={13} />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
