"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isTouch = navigator.maxTouchPoints > 0 || "ontouchstart" in window;

    if (isTouch) {
      const handleTouch = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!anchor) return;
        const el = document.getElementById(anchor.getAttribute("href")!.slice(1));
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      };
      document.addEventListener("click", handleTouch);
      return () => document.removeEventListener("click", handleTouch);
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { duration: 1.2, force: true });
    };

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
}
