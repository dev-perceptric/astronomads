'use client';

import { useEffect, useRef } from 'react';

type Kind = 'planet' | 'field' | 'bust-ring';
type Tone = 'void' | 'marble' | 'astral';

const COLORS: Record<Tone, string> = { void: '255,255,255', marble: '0,0,0', astral: '106,98,247' };

/**
 * Stippled point-cloud art drawn on canvas. A planet is a lit sphere of dots that turns slowly;
 * a field is a drifting scatter of stars, denser toward one corner. Still under reduced motion.
 */
export default function Stipple({ kind, tone = 'void', className }: { kind: Kind; tone?: Tone; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rgb = COLORS[tone];
    let raf = 0;
    let w = 0;
    let h = 0;

    // Deterministic random, so every visit draws the same picture.
    let seed = kind === 'planet' ? 7 : kind === 'field' ? 11 : 19;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

    // Sphere points, kept where light falls more often, so density follows form.
    const sphere: [number, number, number][] = [];
    const ring: [number, number][] = [];
    for (let i = 0; i < 5200; i++) {
      const u = rand() * 2 - 1;
      const t = rand() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u);
      const p: [number, number, number] = [r * Math.cos(t), u, r * Math.sin(t)];
      const light = Math.max(0, -0.55 * p[0] - 0.45 * p[1] + 0.7 * p[2]);
      if (rand() < 0.12 + 0.88 * light ** 1.4) sphere.push(p);
    }
    for (let i = 0; i < 900; i++) {
      const a = rand() * Math.PI * 2;
      const d = 1.35 + rand() * 0.45 + (rand() < 0.5 ? 0 : rand() * 0.15);
      ring.push([a, d]);
    }
    const field: [number, number, number][] = [];
    for (let i = 0; i < 1500; i++) {
      // Denser toward the right edge, like light gathering.
      const x = Math.pow(rand(), 0.55);
      field.push([x, rand(), 0.6 + rand() * 1.2]);
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = `rgba(${rgb},0.95)`;
      if (kind === 'field') {
        const drift = still ? 0 : (time / 1000) * 0.004;
        for (const [x, y, s] of field) {
          const px = (((x + drift * (0.5 + s)) % 1) + 1) % 1;
          ctx.beginPath();
          ctx.arc(px * w, y * h, s, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        const R = Math.min(w, h) * (kind === 'bust-ring' ? 0.27 : 0.4);
        const cx = w / 2;
        const cy = h / 2;
        const spin = still ? 0.6 : (time / 1000) * 0.1;
        const cos = Math.cos(spin);
        const sin = Math.sin(spin);
        for (const [x, y, z] of sphere) {
          const xr = x * cos + z * sin;
          const zr = -x * sin + z * cos;
          if (zr < -0.05) continue;
          const size = 0.7 + 1.1 * zr;
          ctx.beginPath();
          ctx.arc(cx + xr * R, cy + y * R, size, 0, Math.PI * 2);
          ctx.fill();
        }
        if (kind === 'bust-ring') {
          // A tilted orbit ring of dots around the planet.
          for (const [a, d] of ring) {
            const ang = a + (still ? 0 : (time / 1000) * 0.05);
            const rx = Math.cos(ang) * d * R;
            const ry = Math.sin(ang) * d * R * 0.28;
            const tilt = -0.32;
            const px = cx + rx * Math.cos(tilt) - ry * Math.sin(tilt);
            const py = cy + rx * Math.sin(tilt) + ry * Math.cos(tilt);
            const behind = Math.sin(ang) < 0 && Math.hypot(px - cx, py - cy) < R;
            if (behind) continue;
            ctx.beginPath();
            ctx.arc(px, py, 1.1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      if (!still) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    const ro = new ResizeObserver(() => {
      resize();
      if (still) draw(0);
    });
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [kind, tone]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
