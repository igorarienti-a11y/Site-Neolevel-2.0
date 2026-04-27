"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Users, Network, Building2, Zap, Rocket, Award, ArrowRight } from "lucide-react";
import { Tilt3D } from "./Tilt3D";

const diferenciais = [
  {
    icon: Users,
    title: "Mentorias",
    description:
      "Aprenda com nossos Neomentores, todos empreendedores, fundadores ou líderes empresariais em suas operações.",
    span: "md:col-span-2",
    featured: false,
  },
  {
    icon: Network,
    title: "Networking de Alto Nível",
    description:
      "Conecte-se a uma rede líderes empreendedores e potenciais sucessores das mais relevantes empresas de SC.",
    span: "md:col-span-1",
    featured: false,
  },
  {
    icon: Building2,
    title: "Conexão com o Mercado",
    description:
      "Visitas técnicas e acesso exclusivo às estratégias vencedoras de grandes players regionais e nacionais.",
    span: "md:col-span-1",
    featured: false,
  },
  {
    icon: Zap,
    title: "Metodologia Hands On",
    description:
      "Aplique estratégias diferenciadas no seu projeto com acompanhamento e supervisão dos Neomentores.",
    span: "md:col-span-1",
    featured: false,
  },
  {
    icon: Rocket,
    title: "Aceleração de Negócios",
    description:
      "Os projetos com as melhores avaliação em banca serão investidos em até US$ 5 mil em venture capital.",
    span: "md:col-span-1",
    featured: true,
  },
  {
    icon: Award,
    title: "Excelência FIESC",
    description:
      "Conectado ao maior ecossistema de inovação e produção industrial do Sul, a Academia Fiesc é um espaço planejado para ensinar nossa nova geração de líderes.",
    span: "md:col-span-2",
    featured: false,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function DiferenciaisSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="diferenciais"
      className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "rgba(18,32,58,0.88)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 100% 100%, rgba(6,249,250,0.06), transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          
          className="mb-4"
        >
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#06F9FA", fontFamily: "Sora, sans-serif" }}
          >
            Por que o Neolevel
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white mb-5"
          style={{ fontFamily: "Sora, sans-serif" } as React.CSSProperties}
        >
          Formação de alta performance
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#D9D9D9] text-lg max-w-2xl mb-14 leading-relaxed"
        >
          O NEOLEVEL rompe com o modelo tradicional de educação. Conectamos a estrutura e o networking de excelência da Academia FIESC a um ensino prático focado em ROI, escala e liderança.
        </motion.p>

        <div >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            {diferenciais.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} variants={cardVariants} className={item.span}>
                  <Tilt3D
                    className="h-full rounded-2xl border cursor-default overflow-hidden"
                    intensity={8}
                    style={{
                      background: item.featured
                        ? "linear-gradient(135deg, rgba(6,249,250,0.08), rgba(18,32,58,0.8))"
                        : "rgba(255,255,255,0.03)",
                      borderColor: item.featured
                        ? "rgba(6,249,250,0.3)"
                        : "rgba(255,255,255,0.06)",
                    }}
                  >
                      <div className="p-4 md:p-6">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                        style={{
                          background: item.featured ? "rgba(6,249,250,0.15)" : "rgba(255,255,255,0.05)",
                        }}
                      >
                        <Icon size={20} style={{ color: item.featured ? "#06F9FA" : "#D9D9D9" }} />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: "Sora, sans-serif" }}>{item.title}</h3>
                      <p className="text-[#D9D9D9]/70 text-sm leading-relaxed">{item.description}</p>
                      {item.featured && (
                        <div
                          className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ background: "rgba(6,249,250,0.12)", color: "#06F9FA" }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#06F9FA]" />
                          Até US$ 5 mil em venture capital
                        </div>
                      )}
                    </div>
                  </Tilt3D>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <a
            href="#inscricao"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "#06F9FA", color: "#12203A" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 30px rgba(6,249,250,0.35), 0 8px 32px rgba(6,249,250,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Quero fazer parte
            <ArrowRight size={16} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
