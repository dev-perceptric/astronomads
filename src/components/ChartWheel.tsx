'use client';

import { useMemo, useState } from 'react';
import type { Chart, PointKey } from '@/lib/astro/chart';
import { formatDegree } from '@/lib/astro/chart';
import { ELEMENT_COLORS, SIGNS, bodyByKey, norm, type BodyKey } from '@/lib/astro/constants';
import { GlyphAt, type SignKey } from './Glyph';
import s from './ChartWheel.module.css';

/** Radii, outside in. The drawing is 744 units wide, centered on 0,0. */
const R = {
  frame: 322, // outer hairline
  zodiacOut: 316,
  zodiacIn: 266,
  scaleIn: 248, // degree scale ring
  houseIn: 224, // ring holding the house numerals
  glyph: 196,
  degree: 165,
  core: 122, // aspect disc
  label: 352, // AC and MC markers
};

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

type Props = {
  chart: Chart;
  name?: string;
  selected?: BodyKey | null;
  onSelect?: (body: BodyKey | null) => void;
};

export default function ChartWheel({ chart, name, selected = null, onSelect }: Props) {
  const [hovered, setHovered] = useState<BodyKey | null>(null);
  const focus = hovered ?? selected;
  const base = chart.asc ?? 0;

  // Ascendant on the left, zodiac running counterclockwise, as in a traditional chart.
  const theta = (lon: number) => ((180 + (lon - base)) * Math.PI) / 180;
  const pt = (r: number, lon: number): [number, number] => [r * Math.cos(theta(lon)), -r * Math.sin(theta(lon))];
  const f = (n: number) => +n.toFixed(2);
  const line = (r1: number, r2: number, lon: number) => {
    const [x1, y1] = pt(r1, lon);
    const [x2, y2] = pt(r2, lon);
    return { x1: f(x1), y1: f(y1), x2: f(x2), y2: f(y2) };
  };

  const spread = useMemo(() => spreadOut(chart.placements.map((p) => ({ key: p.body, lon: p.lon }))), [chart]);
  const lonOf = (k: PointKey) => (k === 'asc' ? chart.asc! : k === 'mc' ? chart.mc! : chart.placements.find((p) => p.body === k)!.lon);
  const aspectLines = chart.aspects.filter((a) => a.def.kind !== 'conjunction');

  const sun = chart.placements.find((p) => p.body === 'sun')!;
  const moon = chart.placements.find((p) => p.body === 'moon')!;
  const label = [
    name ? `${name}’s birth chart.` : 'Birth chart.',
    `Sun in ${SIGNS[sun.sign].name}, Moon in ${SIGNS[moon.sign].name}`,
    chart.asc !== null ? `, Ascendant in ${SIGNS[Math.floor(chart.asc / 30)].name}.` : '. Birth time unknown.',
  ].join(' ');

  return (
    <svg className={s.wheel} viewBox="-372 -372 744 744" role="img" aria-label={label}>
      {/* Frame */}
      <circle r={R.frame} className={s.frame} />

      {/* Zodiac band: twelve element-tinted sectors, each with its sign */}
      <g>
        {SIGNS.map((sign, i) => {
          const start = i * 30;
          const [gx, gy] = pt((R.zodiacOut + R.zodiacIn) / 2, start + 15);
          const color = ELEMENT_COLORS[sign.element];
          return (
            <g key={sign.key}>
              <path d={sector(pt, R.zodiacIn, R.zodiacOut, start, start + 30)} fill={color} className={s.signSector} />
              <line {...line(R.zodiacIn, R.zodiacOut, start)} className={s.signDivider} />
              <circle cx={f(gx)} cy={f(gy)} r={17} fill={color} className={s.signMedal} />
              <GlyphAt name={sign.key as SignKey} x={gx} y={gy} size={20} color="var(--card)" weight={1.9} />
            </g>
          );
        })}
      </g>

      {/* Degree scale: every degree, longer at 5° and 10° */}
      <circle r={(R.zodiacIn + R.scaleIn) / 2} className={s.scaleBand} strokeWidth={R.zodiacIn - R.scaleIn} />
      <g className={s.ticks}>
        {Array.from({ length: 360 }, (_, d) => {
          const len = d % 30 === 0 ? 18 : d % 10 === 0 ? 10 : d % 5 === 0 ? 7 : 3.5;
          return <line key={d} {...line(R.zodiacIn, R.zodiacIn - len, d)} className={d % 10 === 0 ? s.tickMajor : undefined} />;
        })}
      </g>
      <circle r={R.zodiacOut} className={s.ring} />
      <circle r={R.zodiacIn} className={s.ring} />
      <circle r={R.scaleIn} className={s.ringThin} />

      {/* Houses: Placidus cusps with Roman numerals */}
      {chart.houses && (
        <g>
          <circle r={R.houseIn} className={s.ringThin} />
          {chart.houses.map((cusp, i) => {
            const next = chart.houses![(i + 1) % 12];
            const mid = cusp + norm(next - cusp) / 2;
            const [nx, ny] = pt((R.scaleIn + R.houseIn) / 2, mid);
            const angle = i === 0 || i === 3 || i === 6 || i === 9;
            return (
              <g key={i}>
                {!angle && <line {...line(R.scaleIn, R.core, cusp)} className={s.cusp} />}
                <text x={f(nx)} y={f(ny)} dominantBaseline="central" textAnchor="middle" className={s.houseNum}>
                  {ROMAN[i]}
                </text>
              </g>
            );
          })}
        </g>
      )}

      {/* Angles: heavier axes, arrow at the Ascendant, markers outside the ring */}
      {chart.asc !== null && chart.mc !== null && (
        <g>
          <line {...line(R.zodiacOut, R.core, chart.asc)} className={s.axis} />
          <line {...line(R.zodiacOut, R.core, chart.asc + 180)} className={s.axisSoft} />
          <line {...line(R.zodiacOut, R.core, chart.mc)} className={s.axis} />
          <line {...line(R.zodiacOut, R.core, chart.mc + 180)} className={s.axisSoft} />
          <path d={arrowHead(pt, R.frame + 1, chart.asc)} className={s.arrow} />
          <path d={arrowHead(pt, R.frame + 1, chart.mc)} className={s.arrow} />
          {[
            { lon: chart.asc, text: 'AC' },
            { lon: chart.asc + 180, text: 'DC' },
            { lon: chart.mc, text: 'MC' },
            { lon: chart.mc + 180, text: 'IC' },
          ].map(({ lon, text }) => {
            const [x, y] = pt(R.label, lon);
            return (
              <text key={text} x={f(x)} y={f(y)} dominantBaseline="central" textAnchor="middle" className={text === 'AC' || text === 'MC' ? s.angleMain : s.angleSoft}>
                {text}
              </text>
            );
          })}
        </g>
      )}

      {/* Aspect disc */}
      <circle r={R.core} className={s.core} />
      <g>
        {aspectLines.map((a) => {
          const [x1, y1] = pt(R.core, lonOf(a.a));
          const [x2, y2] = pt(R.core, lonOf(a.b));
          const lit = !focus || a.a === focus || a.b === focus;
          const tight = a.orb < 2;
          return (
            <line
              key={`${a.a}-${a.b}`}
              x1={f(x1)}
              y1={f(y1)}
              x2={f(x2)}
              y2={f(y2)}
              stroke={a.def.color}
              strokeWidth={tight ? 1.8 : 1.15}
              strokeOpacity={lit ? Math.max(0.4, 0.95 - a.orb * 0.08) : 0.07}
              strokeDasharray={a.def.kind === 'sextile' ? '5 4' : undefined}
              strokeLinecap="round"
              className={s.aspect}
            />
          );
        })}
      </g>
      <circle r={3} className={s.center} />

      {/* Planets */}
      <g>
        {chart.placements.map((p) => {
          const body = bodyByKey(p.body);
          const shown = spread.get(p.body) ?? p.lon;
          const [gx, gy] = pt(R.glyph, shown);
          const [dx, dy] = pt(R.degree, shown);
          const [cx, cy] = pt(R.houseIn - 4, p.lon);
          const [lx, ly] = pt(R.glyph + 15, shown);
          const [ix, iy] = pt(R.core, p.lon);
          const dim = focus && focus !== p.body;
          const desc = `${body.name} in ${SIGNS[p.sign].name} ${formatDegree(p.lon)}${p.house ? `, house ${p.house}` : ''}${p.retrograde ? ', retrograde' : ''}`;
          return (
            <g
              key={p.body}
              className={s.planet}
              opacity={dim ? 0.25 : 1}
              tabIndex={0}
              role="button"
              aria-label={desc}
              aria-pressed={selected === p.body}
              onMouseEnter={() => setHovered(p.body)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(p.body)}
              onBlur={() => setHovered(null)}
              onClick={() => onSelect?.(selected === p.body ? null : p.body)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect?.(selected === p.body ? null : p.body);
                }
              }}
            >
              <title>{desc}</title>
              {/* Exact position on the scale and on the aspect disc */}
              <line {...line(R.scaleIn, R.scaleIn - 9, p.lon)} stroke={body.color} strokeWidth={2.2} strokeLinecap="round" />
              <line x1={f(cx)} y1={f(cy)} x2={f(lx)} y2={f(ly)} className={s.leader} />
              <circle cx={f(ix)} cy={f(iy)} r={3.4} fill={body.color} className={s.anchor} />
              {/* Symbol on a soft disc, then its degree and minute */}
              <circle cx={f(gx)} cy={f(gy)} r={16} className={s.planetDisc} />
              <GlyphAt name={p.body} x={gx} y={gy} size={24 * Math.min(1.08, Math.max(0.88, body.weight))} color={body.color} weight={1.9} />
              <text x={f(dx)} y={f(dy)} dominantBaseline="central" textAnchor="middle" className={s.degree}>
                {p.degree}°<tspan className={s.minute}>{String(p.minute).padStart(2, '0')}′</tspan>
                {p.retrograde && <tspan className={s.retro}> R</tspan>}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function sector(pt: (r: number, lon: number) => [number, number], r1: number, r2: number, a: number, b: number) {
  const [x1, y1] = pt(r2, a);
  const [x2, y2] = pt(r2, b);
  const [x3, y3] = pt(r1, b);
  const [x4, y4] = pt(r1, a);
  // Longitude grows counterclockwise on screen, which is sweep-flag 0 in SVG.
  return `M${x1} ${y1} A${r2} ${r2} 0 0 0 ${x2} ${y2} L${x3} ${y3} A${r1} ${r1} 0 0 1 ${x4} ${y4} Z`;
}

/** A small filled arrowhead pointing outward at a given longitude, sitting on the frame. */
function arrowHead(pt: (r: number, lon: number) => [number, number], r: number, lon: number) {
  const [tx, ty] = pt(r + 9, lon);
  const [lx, ly] = pt(r - 1, lon + 1.6);
  const [rx, ry] = pt(r - 1, lon - 1.6);
  return `M${tx} ${ty} L${lx} ${ly} L${rx} ${ry} Z`;
}

/** Pushes crowded planets apart so their symbols never overlap. Returns display longitudes. */
function spreadOut(points: { key: BodyKey; lon: number }[], gap = 10.5): Map<BodyKey, number> {
  const items = points.map((p) => ({ ...p, shown: p.lon })).sort((a, b) => a.lon - b.lon);
  for (let pass = 0; pass < 80; pass++) {
    let moved = false;
    for (let i = 0; i < items.length; i++) {
      const a = items[i];
      const b = items[(i + 1) % items.length];
      let d = b.shown - a.shown;
      if (i === items.length - 1) d += 360;
      if (d < gap) {
        const push = (gap - d) / 2;
        a.shown -= push;
        b.shown += push;
        moved = true;
      }
    }
    if (!moved) break;
  }
  return new Map(items.map((i) => [i.key, norm(i.shown)]));
}
