"use client";

import { useEffect, useRef } from "react";

export function ScrollRibbon() {
  const svgRef = useRef<SVGSVGElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const p1 = path1Ref.current;
    if (!svg || !p1) return;

    if (window.innerWidth < 768) return;

    let len1 = 0;

    const getMax = () => {
      const footerEl = document.querySelector("footer");
      const footerH = footerEl ? footerEl.offsetHeight : 0;
      return document.documentElement.scrollHeight - footerH - window.innerHeight;
    };

    const build = () => {
      const W = window.innerWidth;
      const footerEl = document.querySelector("footer");
      const footerH = footerEl ? footerEl.offsetHeight : 0;
      const H = document.documentElement.scrollHeight - footerH;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.style.height = `${H}px`;

      const seg = H / 9;
      const a = W * 0.82;
      const b = W * 0.12;

      const d1 =
        `M ${a} 0 ` +
        `C ${a} ${seg * 0.4} ${b} ${seg * 0.6} ${b} ${seg} ` +
        `C ${b} ${seg * 1.4} ${a} ${seg * 1.6} ${a} ${seg * 2} ` +
        `C ${a} ${seg * 2.4} ${b} ${seg * 2.6} ${b} ${seg * 3} ` +
        `C ${b} ${seg * 3.4} ${a} ${seg * 3.6} ${a} ${seg * 4} ` +
        `C ${a} ${seg * 4.4} ${b} ${seg * 4.6} ${b} ${seg * 5} ` +
        `C ${b} ${seg * 5.4} ${a} ${seg * 5.6} ${a} ${seg * 6} ` +
        `C ${a} ${seg * 6.4} ${b} ${seg * 6.6} ${b} ${seg * 7} ` +
        `C ${b} ${seg * 7.4} ${a} ${seg * 7.6} ${a} ${seg * 8} ` +
        `C ${a} ${seg * 8.4} ${W * 0.5} ${seg * 8.8} ${W * 0.5} ${H}`;

      p1.setAttribute("d", d1);
      len1 = p1.getTotalLength();
      p1.style.strokeDasharray = `${len1}`;
      p1.style.strokeDashoffset = `${len1}`;
    };

    const onScroll = ({ scroll }: { scroll: number }) => {
      if (len1 <= 0) return;
      const max = getMax();
      const progress = max > 0 ? Math.min(1, scroll / max) : 0;
      p1.style.strokeDashoffset = `${len1 * (1 - progress)}`;
    };

    // Fallback para quando Lenis não está disponível (SSR, touch devices com Lenis desabilitado)
    const onNativeScroll = () => {
      if (len1 <= 0) return;
      const max = getMax();
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      p1.style.strokeDashoffset = `${len1 * (1 - progress)}`;
    };

    const timer = setTimeout(() => {
      build();

      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.on("scroll", onScroll);
      } else {
        window.addEventListener("scroll", onNativeScroll, { passive: true });
      }
    }, 150);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 200);
    };

    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timer);
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.off("scroll", onScroll);
      } else {
        window.removeEventListener("scroll", onNativeScroll);
      }
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="hidden md:block"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <path
        ref={path1Ref}
        fill="none"
        stroke="#06F9FA"
        strokeWidth="4"
        strokeLinecap="round"
        style={{
          opacity: 0.55,
          filter: "drop-shadow(0 0 4px #06F9FA)",
        }}
      />
    </svg>
  );
}
