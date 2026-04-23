"use client";

import { useRef } from "react";

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
}

export function Tilt3D({ children, className, style, intensity = 10 }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(hover: none)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * intensity;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * intensity;
    el.style.transition = "transform 0.08s ease";
    el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateZ(6px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)";
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transformStyle: "preserve-3d", willChange: "transform" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
