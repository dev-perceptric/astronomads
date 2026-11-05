'use client';

import { useEffect, useRef } from 'react';

/** A slow-twinkling starfield behind every page. Still when the viewer prefers less motion. */
export default function Stars() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let stars: { x: number; y: number; r: number; base: number; speed: number; phase: number; tint: string }[] = [];
    const tints = ['246,238,214', '200,186,255', '166,236,225', '255,195,220', '236,232,255'];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((window.innerWidth * window.innerHeight) / 5200);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() < 0.08 ? 1.3 + Math.random() * 0.8 : 0.35 + Math.random() * 0.8,
        base: 0.25 + Math.random() * 0.6,
        speed: 0.4 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        tint: tints[Math.floor(Math.random() * tints.length)],
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const s of stars) {
        const a = still ? s.base : s.base * (0.65 + 0.35 * Math.sin(s.phase + (t / 1000) * s.speed));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.tint},${a})`;
        ctx.fill();
        if (s.r > 1.2) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.tint},${a * 0.08})`;
          ctx.fill();
        }
      }
      if (!still) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="stars" aria-hidden="true" />;
}
