"use client";

import { useEffect, useRef } from "react";

const COUNT = 100;

interface P {
  x: number; y: number;
  vx: number; vy: number;
  r: number; phase: number;
  baseR: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function easeOut(t: number) {
  return 1 - (1 - t) * (1 - t);
}

export function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;

    let W = window.innerWidth;
    let H = window.innerHeight;

    // Skip all animation on mobile - native scroll handles it
    if (W < 768) return;

    const ctx = canvas.getContext("2d")!;

    let raf = 0;
    let scrollProgress = 0;
    let smoothScroll = 0;
    let tick = 0;

    canvas.width = W;
    canvas.height = H;

    const particles: P[] = Array.from({ length: COUNT }, () => {
      const baseR = 2.5 + Math.random() * 2.5;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        r: baseR,
        baseR,
        phase: Math.random() * Math.PI * 2,
      };
    });

    let targets = buildTargets();

    function buildChaos() {
      return Array.from({ length: COUNT }, () => ({
        x: (Math.random() * 0.9 + 0.05) * W,
        y: (Math.random() * 0.9 + 0.05) * H,
      }));
    }

    function buildSpiral() {
      return Array.from({ length: COUNT }, (_, i) => {
        const t = i / COUNT;
        const turns = 3.5;
        const a = t * Math.PI * 2 * turns;
        const maxR = Math.min(W, H) * 0.38;
        const r = t * maxR;
        return {
          x: W / 2 + Math.cos(a) * r + (Math.random() - 0.5) * 30,
          y: H / 2 + Math.sin(a) * r * 0.65 + (Math.random() - 0.5) * 30,
        };
      });
    }

    function buildClusters() {
      const centers = [
        { x: W * 0.20, y: H * 0.25 }, { x: W * 0.50, y: H * 0.12 },
        { x: W * 0.80, y: H * 0.25 }, { x: W * 0.15, y: H * 0.70 },
        { x: W * 0.50, y: H * 0.85 }, { x: W * 0.85, y: H * 0.70 },
      ];
      return Array.from({ length: COUNT }, (_, i) => {
        const c = centers[i % 6];
        const a = (i / COUNT) * Math.PI * 10 + (i % 6) * 1.2;
        const dist = 15 + (i % 11) * 9;
        return {
          x: c.x + Math.cos(a) * dist,
          y: c.y + Math.sin(a) * dist,
        };
      });
    }

    function buildRing() {
      const cx = W / 2, cy = H / 2;
      const maxR = Math.min(W, H) * 0.35;
      return Array.from({ length: COUNT }, (_, i) => {
        const a = (i / COUNT) * Math.PI * 2;
        const ringIndex = Math.floor(i / 25);
        const r = maxR * (0.3 + ringIndex * 0.23);
        return {
          x: cx + Math.cos(a + ringIndex * 0.5) * r,
          y: cy + Math.sin(a + ringIndex * 0.5) * r * 0.75,
        };
      });
    }

    function buildTargets() {
      return {
        chaos: buildChaos(),
        spiral: buildSpiral(),
        clusters: buildClusters(),
        ring: buildRing(),
      };
    }

    function getStage(): { zoom: number; connectDist: number; pAlpha: number; lAlpha: number; glowR: number; lineW: number; color: [number,number,number] } {
      const s = smoothScroll;
      const neon: [number,number,number] = [6, 249, 250];
      const cold: [number,number,number] = [80, 160, 200];

      if (s < 0.10) {
        return { zoom: 1.0, connectDist: 100, pAlpha: 0.4, lAlpha: 0.06, glowR: 8, lineW: 0.5, color: cold };
      }
      if (s < 0.30) {
        const t = easeInOut((s - 0.10) / 0.20);
        return {
          zoom: lerp(1.0, 1.08, t),
          connectDist: lerp(100, 160, t),
          pAlpha: lerp(0.4, 0.65, t),
          lAlpha: lerp(0.06, 0.18, t),
          glowR: lerp(8, 16, t),
          lineW: lerp(0.5, 0.9, t),
          color: [lerp(cold[0],neon[0],t), lerp(cold[1],neon[1],t), lerp(cold[2],neon[2],t)] as [number,number,number],
        };
      }
      if (s < 0.50) {
        const t = easeInOut((s - 0.30) / 0.20);
        return {
          zoom: lerp(1.08, 1.18, t),
          connectDist: lerp(160, 210, t),
          pAlpha: lerp(0.65, 0.80, t),
          lAlpha: lerp(0.18, 0.28, t),
          glowR: lerp(16, 26, t),
          lineW: lerp(0.9, 1.2, t),
          color: [lerp(cold[0],neon[0],easeOut(t)), lerp(cold[1],neon[1],easeOut(t)), lerp(cold[2],neon[2],easeOut(t))] as [number,number,number],
        };
      }
      if (s < 0.72) {
        const t = easeInOut((s - 0.50) / 0.22);
        return {
          zoom: lerp(1.18, 1.30, t),
          connectDist: lerp(210, 260, t),
          pAlpha: lerp(0.80, 0.95, t),
          lAlpha: lerp(0.28, 0.40, t),
          glowR: lerp(26, 38, t),
          lineW: lerp(1.2, 1.6, t),
          color: neon,
        };
      }
      // final: max glow then soft fade
      const t = easeInOut(Math.min(1, (s - 0.72) / 0.20));
      return {
        zoom: lerp(1.30, 1.20, t),
        connectDist: lerp(260, 220, t),
        pAlpha: lerp(0.95, 0.60, t),
        lAlpha: lerp(0.40, 0.18, t),
        glowR: lerp(38, 20, t),
        lineW: lerp(1.6, 1.0, t),
        color: neon,
      };
    }

    function getTargetForProgress(i: number): { x: number; y: number } {
      const s = smoothScroll;

      if (s < 0.10) return targets.chaos[i];

      if (s < 0.30) {
        const t = easeInOut((s - 0.10) / 0.20);
        return {
          x: lerp(targets.chaos[i].x, targets.spiral[i].x, t),
          y: lerp(targets.chaos[i].y, targets.spiral[i].y, t),
        };
      }
      if (s < 0.50) {
        const t = easeInOut((s - 0.30) / 0.20);
        return {
          x: lerp(targets.spiral[i].x, targets.clusters[i].x, t),
          y: lerp(targets.spiral[i].y, targets.clusters[i].y, t),
        };
      }
      if (s < 0.72) {
        const t = easeInOut((s - 0.50) / 0.22);
        return {
          x: lerp(targets.clusters[i].x, targets.ring[i].x, t),
          y: lerp(targets.clusters[i].y, targets.ring[i].y, t),
        };
      }
      return targets.ring[i];
    }

    function getLerpSpeed(): number {
      const s = smoothScroll;
      if (s < 0.10) return 0.003;
      if (s < 0.30) return lerp(0.003, 0.032, easeInOut((s - 0.10) / 0.20));
      if (s < 0.50) return 0.026;
      if (s < 0.72) return 0.036;
      return 0.018;
    }

    function getNoiseStrength(): number {
      const s = smoothScroll;
      if (s < 0.10) return 0.55;
      if (s < 0.30) return lerp(0.55, 0.0, easeInOut((s - 0.10) / 0.20));
      return 0.0;
    }

    function draw() {
      raf = requestAnimationFrame(draw);
      tick += 0.012;

      // Smooth the scroll value
      smoothScroll += (scrollProgress - smoothScroll) * 0.06;

      ctx.clearRect(0, 0, W, H);

      const stage = getStage();
      const lerpSpeed = getLerpSpeed();
      const noise = getNoiseStrength();
      const [cr, cg, cb] = stage.color;

      // Refresh chaos targets so particles keep wandering
      if (smoothScroll < 0.12 && tick % 2.2 < 0.015) {
        targets.chaos = buildChaos();
      }

      // Apply zoom transform centered on canvas
      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.scale(stage.zoom, stage.zoom);
      ctx.translate(-W / 2, -H / 2);

      // Update + collect positions
      const pos: { x: number; y: number }[] = [];
      for (let i = 0; i < COUNT; i++) {
        const p = particles[i];
        const tgt = getTargetForProgress(i);

        if (noise > 0) {
          p.vx += (Math.random() - 0.5) * noise;
          p.vy += (Math.random() - 0.5) * noise;
          p.vx *= 0.90;
          p.vy *= 0.90;
          p.x += p.vx;
          p.y += p.vy;
        }

        p.x += (tgt.x - p.x) * lerpSpeed;
        p.y += (tgt.y - p.y) * lerpSpeed;

        if (p.x < -40) p.x = W + 40;
        if (p.x > W + 40) p.x = -40;
        if (p.y < -40) p.y = H + 40;
        if (p.y > H + 40) p.y = -40;

        pos.push({ x: p.x, y: p.y });
      }

      // Draw connections
      const cd2 = stage.connectDist * stage.connectDist;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = pos[i].x - pos[j].x;
          const dy = pos[i].y - pos[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < cd2) {
            const dist = Math.sqrt(d2);
            const a = stage.lAlpha * (1 - dist / stage.connectDist);
            ctx.beginPath();
            ctx.moveTo(pos[i].x, pos[i].y);
            ctx.lineTo(pos[j].x, pos[j].y);
            ctx.strokeStyle = `rgba(${cr|0},${cg|0},${cb|0},${a.toFixed(3)})`;
            ctx.lineWidth = stage.lineW;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < COUNT; i++) {
        const p = particles[i];
        const pulse = 0.7 + 0.3 * Math.sin(tick * 1.6 + p.phase);
        const radius = p.baseR * pulse * (1 + smoothScroll * 0.8);
        const alpha = stage.pAlpha * (0.75 + 0.25 * pulse);
        const glow = stage.glowR * pulse;

        ctx.shadowColor = `rgb(${cr|0},${cg|0},${cb|0})`;
        ctx.shadowBlur = Math.min(glow, 10);

        ctx.beginPath();
        ctx.arc(pos[i].x, pos[i].y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr|0},${cg|0},${cb|0},${alpha.toFixed(3)})`;
        ctx.fill();
      }

      // Pulse wave at convergence stage
      if (smoothScroll > 0.50 && smoothScroll < 0.90) {
        const waveT = (smoothScroll - 0.50) / 0.40;
        const wavePhase = (tick * 0.4) % 1;
        const waveR = wavePhase * Math.min(W, H) * 0.5;
        const waveA = stage.lAlpha * 0.5 * (1 - wavePhase) * Math.min(1, waveT * 3);
        if (waveA > 0.005) {
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.arc(W / 2, H / 2, waveR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${cr|0},${cg|0},${cb|0},${waveA.toFixed(3)})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
    }

    draw();

    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    }

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        draw();
      }
    }

    function onResize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      targets = buildTargets();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="hidden md:block"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
