"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

const testimonials = [
  { vimeoId: "1186110302", name: "Ana Souza", role: "Grupo Khronos", thumbPosition: "center 20%" },
  { vimeoId: "1186110324", name: "Eduarda", role: "Decoração Náutica", thumbPosition: "center 15%" },
  { vimeoId: "1186110332", name: "Yasmin", role: "Empreendedora", thumbPosition: "center 20%" },
];

function useVimeoThumb(vimeoId: string) {
  const [thumb, setThumb] = useState<string>("");

  useEffect(() => {
    fetch(`https://vimeo.com/api/v2/video/${vimeoId}.json`)
      .then((r) => r.json())
      .then((data) => setThumb(data[0]?.thumbnail_large ?? ""))
      .catch(() => {});
  }, [vimeoId]);

  return thumb;
}

function VideoModal({ vimeoId, name, role, onClose }: { vimeoId: string; name: string; role: string; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            aspectRatio: "9/16",
            height: "min(88vh, 640px)",
            border: "1px solid rgba(6,249,250,0.15)",
            boxShadow: "0 0 60px rgba(6,249,250,0.08)",
          }}
        >
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{ border: "none" }}
          />
        </div>

        <div className="mt-4 text-center">
          <div className="text-white font-semibold text-sm" style={{ fontFamily: "Sora, sans-serif" }}>{name}</div>
          <div className="text-[#D9D9D9]/50 text-xs mt-0.5">{role}</div>
        </div>
      </motion.div>

      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
      >
        <X size={18} color="#fff" />
      </button>
    </motion.div>
  );
}

function VideoCard({ t, index, isInView }: { t: (typeof testimonials)[0]; index: number; isInView: boolean }) {
  const [open, setOpen] = useState(false);
  const thumb = useVimeoThumb(t.vimeoId);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.1 }}
        className="rounded-2xl border overflow-hidden group cursor-pointer"
        style={{ background: "rgba(18,32,58,0.6)", borderColor: "rgba(6,249,250,0.12)" }}
        onClick={() => setOpen(true)}
      >
        <div className="aspect-video relative overflow-hidden" style={{ background: "#0a1628" }}>
          {thumb && (
            <img
              src={thumb}
              alt={t.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: t.thumbPosition }}
            />
          )}
          <div className="absolute inset-0" style={{ background: "rgba(6,14,25,0.45)" }} />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "rgba(6,249,250,0.9)", boxShadow: "0 0 40px rgba(6,249,250,0.4)" }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: "2px solid rgba(6,249,250,0.5)" }}
                animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <Play size={22} fill="#0a1628" style={{ color: "#0a1628", marginLeft: 3 }} />
            </motion.div>
          </div>
        </div>

        <div className="p-5 flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ background: "rgba(6,249,250,0.1)", color: "#06F9FA", fontFamily: "Sora, sans-serif" }}
          >
            {t.name[0]}
          </div>
          <div>
            <div className="text-sm font-semibold text-white" style={{ fontFamily: "Sora, sans-serif" }}>{t.name}</div>
            <div className="text-xs text-[#D9D9D9]/50 mt-0.5">{t.role}</div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <VideoModal vimeoId={t.vimeoId} name={t.name} role={t.role} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export function ProvasSocialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden" style={{ background: "rgba(30,30,30,0.85)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(6,249,250,0.05), transparent 70%)" }}
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
          {testimonials.map((t, i) => (
            <VideoCard key={t.vimeoId} t={t} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
