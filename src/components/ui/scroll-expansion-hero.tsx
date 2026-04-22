"use client";

import { useRef, ReactNode, useState } from "react";
import { motion, useScroll, useTransform, MotionValue, useMotionValueEvent } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaSrc: string;
  label?: string;
  title?: string;
  scrollToExpand?: string;
  children?: ReactNode;
}

export function ScrollExpandMedia({
  mediaSrc,
  label,
  title,
  scrollToExpand,
  children,
}: ScrollExpandMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const mediaWidth = useTransform(scrollYProgress, [0, 0.75], ["60vw", "100vw"]);
  const mediaHeight = useTransform(scrollYProgress, [0, 0.75], ["55vh", "100vh"]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.75], [16, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.75], [0.35, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.3], ["0px", "-40px"]);
  const contentOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);

  const [fullyExpanded, setFullyExpanded] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setFullyExpanded(v >= 0.75);
  });

  const videoId = mediaSrc.includes("embed")
    ? mediaSrc.split("/embed/")[1]?.split("?")[0]
    : mediaSrc.split("v=")[1];

  const embedSrc = fullyExpanded
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
    : `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&rel=0&modestbranding=1&playlist=${videoId}`;

  return (
    <div ref={containerRef} style={{ height: "280vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          background: "rgba(14,26,43,0.95)",
        }}
      >
        {/* Header — label + title acima do vídeo */}
        {(label || title) && (
          <motion.div
            className="text-center z-10 pointer-events-none"
            style={{ opacity: headerOpacity, y: headerY }}
          >
            {label && (
              <span
                className="text-xs font-semibold tracking-[0.22em] uppercase block mb-3"
                style={{ color: "#06F9FA", fontFamily: "Sora, sans-serif" }}
              >
                {label}
              </span>
            )}
            {title && (
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                {title}
              </h2>
            )}
          </motion.div>
        )}

        {/* Vídeo que expande */}
        <motion.div
          className="relative overflow-hidden z-10"
          style={{
            width: mediaWidth as MotionValue<string>,
            height: mediaHeight as MotionValue<string>,
            maxWidth: "100vw",
            maxHeight: "100vh",
            borderRadius,
            boxShadow: "0 0 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(6,249,250,0.08)",
          }}
        >
          <iframe
            src={embedSrc}
            className="w-full h-full"
            style={{ border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <motion.div
            className="absolute inset-0 bg-black pointer-events-none"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>

        {/* Hint de scroll */}
        {scrollToExpand && (
          <motion.p
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold tracking-[0.22em] uppercase z-10"
            style={{
              opacity: hintOpacity,
              color: "rgba(6,249,250,0.7)",
              fontFamily: "Sora, sans-serif",
            }}
          >
            {scrollToExpand}
          </motion.p>
        )}

        {children && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: contentOpacity, pointerEvents: "none" }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}
