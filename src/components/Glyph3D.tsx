'use client';

import { useId } from 'react';
import { SHAPES, type GlyphName } from './Glyph';

/**
 * Our symbols as solid objects: a lit face, an extruded side going back to the lower right,
 * a rounded bevel lit from the upper left, and a soft cast shadow.
 * Drawn on the same 24 grid as `Glyph`, so the two always match.
 */
type Props = { name: GlyphName; color: string; weight?: number; ground?: 'dark' | 'light'; depth?: number };

const DEPTH_STEP: [number, number] = [0.24, 0.32];

function Layer({ name, paint, weight, dx = 0, dy = 0, opacity, filter, mask }: { name: GlyphName; paint: string; weight: number; dx?: number; dy?: number; opacity?: number; filter?: string; mask?: string }) {
  const s = SHAPES[name];
  return (
    <g transform={dx || dy ? `translate(${dx} ${dy})` : undefined} fill="none" stroke={paint} strokeWidth={weight} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} filter={filter} mask={mask}>
      {s.d && <path d={s.d} />}
      {s.f && <path d={s.f} fill={paint} />}
      {s.circles?.map(([cx, cy, r], i) => <circle key={`c${i}`} cx={cx} cy={cy} r={r} />)}
      {s.rects?.map(([x, y, w, h], i) => <rect key={`r${i}`} x={x} y={y} width={w} height={h} rx={0.6} />)}
      {s.dots?.map(([cx, cy, r], i) => <circle key={`d${i}`} cx={cx} cy={cy} r={r} fill={paint} stroke="none" />)}
    </g>
  );
}

/** The solid symbol in the 24 grid. Put it inside an SVG, or use `Glyph3DAt` or `Glyph3D`. */
function Solid({ name, color, weight = 2.6, ground = 'dark', depth = 4 }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const face = `${id}-face`;
  const blur = `${id}-blur`;
  const bevel = `${id}-bevel`;
  const mix = (amount: number) => `color-mix(in oklch, ${color}, black ${amount}%)`;
  return (
    <>
      <defs>
        <linearGradient id={face} gradientUnits="userSpaceOnUse" x1="3" y1="2" x2="20" y2="22">
          <stop offset="0%" style={{ stopColor: `color-mix(in oklch, ${color}, white 34%)` }} />
          <stop offset="40%" style={{ stopColor: color }} />
          <stop offset="100%" style={{ stopColor: mix(10) }} />
        </linearGradient>
        <filter id={blur} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.3" />
        </filter>
        {/* A rounded bevel: the face is treated as a raised surface and lit from the upper left. */}
        <filter id={bevel} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation={weight * 0.32} result="height" />
          <feSpecularLighting in="height" surfaceScale="2" specularConstant="0.5" specularExponent="24" lightingColor="white" result="shine">
            <feDistantLight azimuth="225" elevation="38" />
          </feSpecularLighting>
          <feComposite in="shine" in2="SourceAlpha" operator="in" result="shineIn" />
          <feDiffuseLighting in="height" surfaceScale="2.6" diffuseConstant="1" lightingColor="white" result="shade">
            <feDistantLight azimuth="225" elevation="70" />
          </feDiffuseLighting>
          <feComposite in="SourceGraphic" in2="shade" operator="arithmetic" k1="1.05" k2="0" k3="0" k4="0" result="shaded" />
          <feComposite in="shaded" in2="shineIn" operator="arithmetic" k1="0" k2="1" k3="0.45" k4="0" />
        </filter>
      </defs>
      {/* Cast shadow */}
      <Layer name={name} paint="black" weight={weight} dx={depth * DEPTH_STEP[0] + 1.4} dy={depth * DEPTH_STEP[1] + 2} opacity={ground === 'dark' ? 0 : 0.12} filter={`url(#${blur})`} />
      {/* Extruded side, darkest at the back */}
      {Array.from({ length: depth }, (_, k) => {
        const i = depth - k;
        const back = ground === 'dark' ? 42 - (k / depth) * 14 : 46 - (k / depth) * 16;
        return <Layer key={i} name={name} paint={mix(back)} weight={weight} dx={i * DEPTH_STEP[0]} dy={i * DEPTH_STEP[1]} />;
      })}
      {/* Lit face */}
      <Layer name={name} paint={`url(#${face})`} weight={weight} filter={`url(#${bevel})`} />
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
