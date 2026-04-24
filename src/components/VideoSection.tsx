"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";

export function VideoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: "rgba(30,30,30,0.85)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 40% 50% at 50% 50%, rgba(6,249,250,0.04), transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#06F9FA", fontFamily: "Sora, sans-serif" }}
          >
            Estrutura & Ambiente
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mt-3"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Conheça nossa infraestrutura
          </h2>
          <p className="text-[#D9D9D9]/60 text-sm mt-3">
            Salas, equipamentos e um ambiente criado para elevar o nível de quem quer crescer de verdade.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(6,249,250,0.12)",
            boxShadow: "0 0 80px rgba(6,249,250,0.05), 0 40px 80px rgba(0,0,0,0.5)",
          }}
        >
          {!playing ? (
            <div
              className="relative aspect-video bg-[#12203A] cursor-pointer group"
              onClick={() => setPlaying(true)}
            >
              <img
                src="https://vumbnail.com/1186110671.jpg"
                alt="Neolevel Business School"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(6,249,250,0.9)", boxShadow: "0 0 40px rgba(6,249,250,0.4)" }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: "2px solid rgba(6,249,250,0.5)" }}
                    animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  />
                  <Play size={28} fill="#12203A" style={{ color: "#12203A", marginLeft: 3 }} />
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="aspect-video">
              <iframe
                src="https://player.vimeo.com/video/1186110671?autoplay=1&title=0&byline=0&portrait=0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                style={{ border: "none" }}
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
