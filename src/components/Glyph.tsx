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

type Shape = {
  d?: string; // stroked path
  f?: string; // filled path
  circles?: [number, number, number][];
  dots?: [number, number, number][];
  rects?: [number, number, number, number][];
};

export const SHAPES: Record<GlyphName, Shape> = {
  // Planets: a bolder family with solid details (filled crescent, arrowhead, trident tips, orb)
  sun: { circles: [[12, 12, 8.2]], dots: [[12, 12, 2.5]] },
  moon: { f: 'M9 3.4A8.6 8.6 0 1 1 9 20.6A11.4 11.4 0 0 0 9 3.4Z' },
  mercury: { d: 'M7.6 3.2C8.2 5.9 9.8 7.4 12 7.4C14.2 7.4 15.8 5.9 16.4 3.2M12 15.9V21.8M9.2 18.9H14.8', circles: [[12, 11.6, 4.1]] },
  venus: { d: 'M12 14.2V21.8M8.6 18.2H15.4', circles: [[12, 8.8, 5.3]] },
  mars: { d: 'M13.5 10.5 18.2 5.8', circles: [[9.6, 14.4, 5.5]], f: 'M20.8 3.2 20.4 9.9 14.1 3.6Z' },
  jupiter: { d: 'M5.4 8C5.6 4.8 9.2 3.3 11.3 5.2C13.5 7.2 11.5 11 5.2 16.4H19.6M15.8 3.8V21.4' },
  saturn: { d: 'M8.2 2.8V16M5 6H11.4M8.2 12.6C9.4 10 15.8 9.6 15.8 13.8C15.8 16.8 12.8 17.6 12.8 20C12.8 21.6 14.2 22.2 16 21.2' },
  uranus: { d: 'M6 3.4V13.6M18 3.4V13.6M6 8.5H18M12 3.4V15.8', circles: [[12, 18.7, 2.6]], dots: [[12, 18.7, 0.9]] },
  neptune: { d: 'M5.2 6.6C5.2 11 8.2 13.4 12 13.4C15.8 13.4 18.8 11 18.8 6.6M12 5.2V21.8M8.6 18.2H15.4', f: 'M5.2 2.8 3.3 6.6H7.1ZM18.8 2.8 16.9 6.6H20.7ZM12 1.6 10.1 5.4H13.9Z' },
  pluto: { d: 'M5.8 3.8C5.8 7.3 8.6 9.9 12 9.9C15.4 9.9 18.2 7.3 18.2 3.8M12 9.9V21.8M8.6 17.2H15.4', dots: [[12, 4.6, 2.4]] },

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
      {shape.f && <path d={shape.f} fill="currentColor" />}
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

/**
 * The same symbol inside another SVG, centered on (x, y).
 * `halo` draws a thin knockout edge in the given color first, so any line passing near never touches the symbol.
 */
export function GlyphAt({ name, x, y, size, color, weight = 1.6, halo }: { name: GlyphName; x: number; y: number; size: number; color: string; weight?: number; halo?: string }) {
  const scale = size / 24;
  const transform = `translate(${(x - size / 2).toFixed(2)} ${(y - size / 2).toFixed(2)}) scale(${scale.toFixed(4)})`;
  return (
    <>
      {halo && (
        <g transform={transform} {...strokeProps} stroke={halo} strokeWidth={(weight + 6) / scale} style={{ color: halo }}>
          <Paths shape={SHAPES[name]} />
        </g>
      )}
      <g transform={transform} {...strokeProps} stroke={color} strokeWidth={weight / scale} style={{ color }}>
        <Paths shape={SHAPES[name]} />
      </g>
    </>
  );
}
