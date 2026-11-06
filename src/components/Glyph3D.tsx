'use client';

import { useId } from 'react';
import { SHAPES, type GlyphName } from './Glyph';

/**
 * Our symbols as cold, solid objects: a polished metal face with a hard horizon line, a thin cut
 * edge going back to the lower right, a sharp glint on the lit edges and a faint aura in their color.
 * Square ends and mitered corners keep the lines rigid.
 * Drawn on the same 24 grid as `Glyph`, so the two always match.
 */
type Props = { name: GlyphName; color: string; weight?: number; ground?: 'dark' | 'light'; depth?: number };

const DEPTH_STEP: [number, number] = [0.2, 0.26];

function Layer({ name, paint, weight, dx = 0, dy = 0, opacity, filter, mask }: { name: GlyphName; paint: string; weight: number; dx?: number; dy?: number; opacity?: number; filter?: string; mask?: string }) {
  const s = SHAPES[name];
  return (
    <g transform={dx || dy ? `translate(${dx} ${dy})` : undefined} fill="none" stroke={paint} strokeWidth={weight} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={6} opacity={opacity} filter={filter} mask={mask}>
      {s.d && <path d={s.d} />}
      {s.f && <path d={s.f} fill={paint} />}
      {s.circles?.map(([cx, cy, r], i) => <circle key={`c${i}`} cx={cx} cy={cy} r={r} />)}
      {s.rects?.map(([x, y, w, h], i) => <rect key={`r${i}`} x={x} y={y} width={w} height={h} rx={0.6} />)}
      {s.dots?.map(([cx, cy, r], i) => <circle key={`d${i}`} cx={cx} cy={cy} r={r} fill={paint} stroke="none" />)}
    </g>
  );
}

/** The solid symbol in the 24 grid. Put it inside an SVG, or use `Glyph3DAt` or `Glyph3D`. */
function Solid({ name, color, weight = 1.9, ground = 'dark', depth = 3 }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const face = `${id}-face`;
  const aura = `${id}-aura`;
  const glint = `${id}-glint`;
  const dark = (amount: number) => `color-mix(in oklch, ${color}, black ${amount}%)`;
  const light = (amount: number) => `color-mix(in oklch, ${color}, white ${amount}%)`;
  return (
    <>
      <defs>
        {/* Polished metal: a cold highlight, the color, then a hard horizon line across the middle. */}
        <linearGradient id={face} gradientUnits="userSpaceOnUse" x1="6" y1="1" x2="14" y2="23">
          <stop offset="0%" style={{ stopColor: light(62) }} />
          <stop offset="30%" style={{ stopColor: color }} />
          <stop offset="49%" style={{ stopColor: dark(34) }} />
          <stop offset="51%" style={{ stopColor: light(22) }} />
          <stop offset="100%" style={{ stopColor: dark(18) }} />
        </linearGradient>
        <filter id={aura} filterUnits="userSpaceOnUse" x="-12" y="-12" width="48" height="48">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
        {/* A thin, hard glint along the lit edges, no softening of the shape. */}
        <filter id={glint} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation={weight * 0.14} result="height" />
          <feSpecularLighting in="height" surfaceScale="1.4" specularConstant="0.8" specularExponent="48" lightingColor="white" result="shine">
            <feDistantLight azimuth="225" elevation="32" />
          </feSpecularLighting>
          <feComposite in="shine" in2="SourceAlpha" operator="in" result="shineIn" />
          <feComposite in="SourceGraphic" in2="shineIn" operator="arithmetic" k1="0" k2="1" k3="0.6" k4="0" />
        </filter>
      </defs>
      {/* Aura */}
      <Layer name={name} paint={color} weight={weight * 2.2} opacity={ground === 'dark' ? 0.38 : 0.1} filter={`url(#${aura})`} />
      {/* A thin cut edge going back to the lower right */}
      {Array.from({ length: depth }, (_, k) => {
        const i = depth - k;
        return <Layer key={i} name={name} paint={dark(ground === 'dark' ? 58 - k * 6 : 62 - k * 6)} weight={weight} dx={i * DEPTH_STEP[0]} dy={i * DEPTH_STEP[1]} />;
      })}
      {/* Polished face */}
      <Layer name={name} paint={`url(#${face})`} weight={weight} filter={`url(#${glint})`} />
    </>
  );
}

/** A solid symbol on its own. The box leaves room for the depth and shadow. */
export function Glyph3D({ name, size, color, weight, ground, depth, title, className }: Props & { size: number; title?: string; className?: string }) {
  return (
    <svg viewBox="-2 -2 30 30" width={size} height={size} className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} style={{ flexShrink: 0, display: 'inline-block', overflow: 'visible' }}>
      <Solid name={name} color={color} weight={weight} ground={ground} depth={depth} />
    </svg>
  );
}

/** A solid symbol inside another SVG, its face centered on (x, y). */
export function Glyph3DAt({ name, x, y, size, color, weight, ground, depth }: Props & { x: number; y: number; size: number }) {
  const scale = size / 24;
  return (
    <g transform={`translate(${(x - size / 2).toFixed(2)} ${(y - size / 2).toFixed(2)}) scale(${scale.toFixed(4)})`} style={{ pointerEvents: 'none' }}>
      <Solid name={name} color={color} weight={weight} ground={ground} depth={depth} />
    </g>
  );
}
