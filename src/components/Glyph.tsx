import type { AspectKind, BodyKey } from '@/lib/astro/constants';

/**
 * Astronomads' own symbol set, drawn on a 24×24 grid with round 1.6 strokes.
 * One family for planets, signs, aspects and angles, so every symbol shares weight and proportion.
 */
export type GlyphName = BodyKey | SignKey | AspectKind | 'asc' | 'mc';
export type SignKey =
  | 'aries'
  | 'taurus'
  | 'gemini'
  | 'cancer'
  | 'leo'
  | 'virgo'
  | 'libra'
  | 'scorpio'
  | 'sagittarius'
  | 'capricorn'
  | 'aquarius'
  | 'pisces';

type Shape = { d?: string; circles?: [number, number, number][]; dots?: [number, number, number][]; rects?: [number, number, number, number][] };

export const SHAPES: Record<GlyphName, Shape> = {
  // Planets
  sun: { circles: [[12, 12, 8]], dots: [[12, 12, 1.7]] },
  moon: { d: 'M9 3.5A8.5 8.5 0 1 1 9 20.5A11 11 0 0 0 9 3.5Z' },
  mercury: { d: 'M7.5 3.2A4.6 4.6 0 0 0 16.5 3.2M12 15.6V21.6M9 18.6H15', circles: [[12, 11.5, 4.1]] },
  venus: { d: 'M12 14.2V22M8.5 18.2H15.5', circles: [[12, 8.8, 5.4]] },
  mars: { d: 'M13.9 10.1 19.8 4.2M14.4 4.2H19.8V9.6', circles: [[9.8, 14.2, 5.6]] },
  jupiter: { d: 'M5.5 7.6C6 4.6 10.8 3.6 11.4 7C11.9 10 8.1 13.8 5 16.6H19.2M15.6 3.8V21' },
  saturn: { d: 'M8 3V15.8M5 6.4H11.4M8 12.2C9.4 9.6 15.6 9.4 15.6 13.6C15.6 16.6 12.6 17.6 12.6 20C12.6 21.6 14 22.1 15.6 21.2' },
  uranus: { d: 'M6 3.6V14.6M18 3.6V14.6M6 9.1H18M12 3.6V16.4', circles: [[12, 19, 2.4]] },
  neptune: { d: 'M5 4.6C5 9.8 8 12.8 12 12.8C16 12.8 19 9.8 19 4.6M12 3.6V21.6M8.4 17.8H15.6M3.6 6.4 5 4.4 6.4 6.4M17.6 6.4 19 4.4 20.4 6.4M10.6 5.4 12 3.4 13.4 5.4' },
  pluto: { d: 'M6 3.8A6 6 0 0 0 18 3.8M12 9.8V21.8M8.4 17H15.6', circles: [[12, 5.4, 2.3]] },

  // Signs
  aries: { d: 'M12 21V9.4C12 4.6 4 3.2 4 8.2C4 10 5.2 11.2 6.6 11.2M12 9.4C12 4.6 20 3.2 20 8.2C20 10 18.8 11.2 17.4 11.2' },
  taurus: { d: 'M4 3.8C5 7.8 8.4 9.6 12 9.6C15.6 9.6 19 7.8 20 3.8', circles: [[12, 15.2, 5.6]] },
  gemini: { d: 'M5 4C9 5.6 15 5.6 19 4M5 20C9 18.4 15 18.4 19 20M9 5.1V18.9M15 5.1V18.9' },
  cancer: { d: 'M7.4 6.4C11 4 17 4.6 20 8.2M16.6 17.6C13 20 7 19.4 4 15.8', circles: [[7.4, 9, 2.6], [16.6, 15, 2.6]] },
  leo: { d: 'M11.4 15.6C11.4 12 8 9.6 8 6.6C8 4.1 10 2.8 12.5 2.8C15.4 2.8 17 5 17 7.6C17 11 13.6 13.2 13.6 17C13.6 19.6 15.4 21 17.4 21C18.9 21 19.9 20.1 20.4 19', circles: [[8.4, 15.6, 3]] },
  virgo: { d: 'M3.6 6.8C4.6 5.8 6 5.9 6 8V19M6 9C6 5.8 10 5.8 10 9V19M10 9C10 5.8 14 5.8 14 9V21.4M14 12.4C17.2 11.2 20.4 13.2 19.4 16.4C18.6 18.8 16 20 13.2 20.6' },
  libra: { d: 'M4 20H20M4 15.6H8.5C7 14.2 6.4 12.6 6.4 11C6.4 7.9 8.9 5.4 12 5.4C15.1 5.4 17.6 7.9 17.6 11C17.6 12.6 17 14.2 15.5 15.6H20' },
  scorpio: { d: 'M3.6 6.8C4.6 5.8 6 5.9 6 8V19M6 9C6 5.8 10 5.8 10 9V19M10 9C10 5.8 14 5.8 14 9V16.8C14 19.4 15.6 20.6 18 20.6H20.8M18.4 18.2 20.8 20.6 18.4 23' },
  sagittarius: { d: 'M5 19 19 5M12.4 5H19V11.6M7.8 11.2 12.8 16.2' },
  capricorn: { d: 'M3.8 6.2C5 5 6.2 5.6 6.6 7L9.6 17L12.8 6.6C13.8 4.2 17.4 5.6 16.4 9L14.6 16.4C14 19.2 15.2 21 17.4 21C19.8 21 20.6 18.4 19.2 16.8C17.8 15.2 15.4 15.6 14.6 16.8' },
  aquarius: { d: 'M3 10.2 6 7.6 9 10.2 12 7.6 15 10.2 18 7.6 21 10.2M3 16.6 6 14 9 16.6 12 14 15 16.6 18 14 21 16.6' },
  pisces: { d: 'M5 4C10 7.6 10 16.4 5 20M19 4C14 7.6 14 16.4 19 20M5.6 12H18.4' },

  // Aspects
  conjunction: { d: 'M12.4 11.6 19 5', circles: [[9, 15, 4.6]] },
  sextile: { d: 'M12 3.4V20.6M4.6 7.7 19.4 16.3M4.6 16.3 19.4 7.7' },
  square: { rects: [[5, 5, 14, 14]] },
  trine: { d: 'M12 4.4 20.2 18.8H3.8Z' },
  opposition: { d: 'M8.7 15.3 15.3 8.7', circles: [[6.5, 17.5, 3], [17.5, 6.5, 3]] },

  // Angles: a small arrowhead for the Ascendant, a crowned M for the Midheaven
  asc: { d: 'M4 12H20M14 6 20 12 14 18' },
  mc: { d: 'M4.5 19V6.5L12 15L19.5 6.5V19M8 3.5H16' },
};

function Paths({ shape }: { shape: Shape }) {
  return (
    <>
      {shape.d && <path d={shape.d} />}
      {shape.circles?.map(([cx, cy, r], i) => <circle key={`c${i}`} cx={cx} cy={cy} r={r} />)}
      {shape.rects?.map(([x, y, w, h], i) => <rect key={`r${i}`} x={x} y={y} width={w} height={h} rx={0.6} />)}
      {shape.dots?.map(([cx, cy, r], i) => <circle key={`d${i}`} cx={cx} cy={cy} r={r} fill="currentColor" stroke="none" />)}
    </>
  );
}

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** An inline symbol for text, tables and buttons. */
export function Glyph({ name, size = 18, color, title, weight = 1.6, className }: { name: GlyphName; size?: number; color?: string; title?: string; weight?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      {...strokeProps}
      strokeWidth={weight}
      style={{ color, flexShrink: 0, verticalAlign: '-0.18em', display: 'inline-block' }}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <Paths shape={SHAPES[name]} />
    </svg>
  );
}

/** The same symbol inside another SVG, centered on (x, y). */
export function GlyphAt({ name, x, y, size, color, weight = 1.6 }: { name: GlyphName; x: number; y: number; size: number; color: string; weight?: number }) {
  const scale = size / 24;
  return (
    <g transform={`translate(${(x - size / 2).toFixed(2)} ${(y - size / 2).toFixed(2)}) scale(${scale.toFixed(4)})`} {...strokeProps} stroke={color} strokeWidth={weight / scale} style={{ color }}>
      <Paths shape={SHAPES[name]} />
    </g>
  );
}
