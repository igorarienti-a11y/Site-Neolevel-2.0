"use client";

import { useEffect, useRef } from "react";

export function ScrollRibbon() {
  const svgRef = useRef<SVGSVGElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const p1 = path1Ref.current;
    const p2 = path2Ref.current;
    if (!svg || !p1 || !p2) return;

    let rafId = 0;

    const build = () => {
      const W = window.innerWidth;
      const H = document.documentElement.scrollHeight;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

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

      const c = W * 0.55;
      const d2 =
        `M ${W * 0.05} ${H * 0.08} ` +
        `C ${W * 0.05} ${H * 0.18} ${c} ${H * 0.22} ${c} ${H * 0.32} ` +
        `C ${c} ${H * 0.42} ${W * 0.15} ${H * 0.48} ${W * 0.15} ${H * 0.58} ` +
        `C ${W * 0.15} ${H * 0.68} ${c} ${H * 0.72} ${c} ${H * 0.82} ` +
        `C ${c} ${H * 0.92} ${W * 0.3} ${H * 0.96} ${W * 0.3} ${H}`;

      p1.setAttribute("d", d1);
      p2.setAttribute("d", d2);

      const len1 = p1.getTotalLength();
      const len2 = p2.getTotalLength();

      p1.style.strokeDasharray = `${len1}`;
      p1.style.strokeDashoffset = `${len1}`;
      p2.style.strokeDasharray = `${len2}`;
      p2.style.strokeDashoffset = `${len2}`;

      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        p1.style.strokeDashoffset = `${len1 * (1 - progress)}`;
        p2.style.strokeDashoffset = `${len2 * (1 - Math.pow(progress, 0.8))}`;
      };

      window.removeEventListener("scroll", onScroll);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      return onScroll;
    };

    let cleanup: (() => void) | null = null;

    const init = () => {
      const fn = build();
      cleanup = () => window.removeEventListener("scroll", fn);
    };

    const timer = setTimeout(init, 150);

    const onResize = () => {
      if (cleanup) cleanup();
      const fn = build();
      cleanup = () => window.removeEventListener("scroll", fn);
    };

    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      if (cleanup) cleanup();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
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
      <defs>
        <filter id="ribbon-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        ref={path1Ref}
        fill="none"
        stroke="#06F9FA"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#ribbon-glow)"
        style={{ opacity: 0.55 }}
      />
      <path
        ref={path2Ref}
        fill="none"
        stroke="#06F9FA"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ opacity: 0.25 }}
      />
    </svg>
  );
}
