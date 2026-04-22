"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Preciso já ter uma empresa?",
    a: "Não. O Neolevel serve para quem quer criar, assumir ou acelerar um negócio. Atendemos herdeiros que ainda não assumiram a empresa, jovens com ideias de negócio e primeiros empreendedores que estão começando do zero.",
  },
  {
    q: "Qual o diferencial da FIESC?",
    a: "Você terá acesso à estrutura da Academia de Negócios FIESC, referência em excelência industrial de Santa Catarina. Isso inclui infraestrutura de alto nível, conexões com as maiores indústrias do estado e um network que poucos têm acesso.",
  },
  {
    q: "O curso é reconhecido?",
    a: "O Neolevel é uma formação de elite focada em resultados práticos de mercado. Diferente de uma faculdade tradicional, o valor está na metodologia hands-on, na qualidade dos mentores e nas conexões que você constrói ao longo dos 2 anos.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-2xl border overflow-hidden"
      style={{
        background: open ? "rgba(6,249,250,0.04)" : "rgba(255,255,255,0.03)",
        borderColor: open ? "rgba(6,249,250,0.2)" : "rgba(255,255,255,0.07)",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <span
          className="font-semibold text-white text-base"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          {q}
        </span>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
          style={{
            background: open ? "rgba(6,249,250,0.15)" : "rgba(255,255,255,0.05)",
          }}
        >
          {open ? (
            <Minus size={14} style={{ color: "#06F9FA" }} />
          ) : (
            <Plus size={14} style={{ color: "#D9D9D9" }} />
          )}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-[#D9D9D9]/75 text-sm leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="faq" className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden" style={{ background: "rgba(18,32,58,0.88)" }}>
      <div className="max-w-3xl mx-auto" ref={ref}>
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
            Dúvidas frequentes
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mt-3"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Perguntas Frequentes
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
