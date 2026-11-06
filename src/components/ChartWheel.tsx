'use client';

import { useMemo, useState } from 'react';
import type { Chart, PointKey } from '@/lib/astro/chart';
import { formatDegree } from '@/lib/astro/chart';
import { ELEMENT_COLORS, SIGNS, bodyByKey, norm, type BodyKey } from '@/lib/astro/constants';
import s from './ChartWheel.module.css';

const R = {
  outer: 300,
  tickIn: 290,
  signIn: 248,
  glyph: 216,
  degree: 186,
  houseNum: 112,
  core: 100,
};

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

  // Rising sign on the left, zodiac running counterclockwise, as in a traditional chart.
  const theta = (lon: number) => ((180 + (lon - base)) * Math.PI) / 180;
  const pt = (r: number, lon: number): [number, number] => [r * Math.cos(theta(lon)), -r * Math.sin(theta(lon))];
  const f = (n: number) => +n.toFixed(2);

  const spread = useMemo(() => spreadOut(chart.placements.map((p) => ({ key: p.body, lon: p.lon }))), [chart]);
  const lonOf = (k: PointKey) => (k === 'asc' ? chart.asc! : k === 'mc' ? chart.mc! : chart.placements.find((p) => p.body === k)!.lon);
  const lines = chart.aspects.filter((a) => a.def.kind !== 'conjunction');

  const sun = chart.placements.find((p) => p.body === 'sun')!;
  const moon = chart.placements.find((p) => p.body === 'moon')!;
  const label = [
    name ? `${name}’s birth chart.` : 'Birth chart.',
    `Sun in ${SIGNS[sun.sign].name}, Moon in ${SIGNS[moon.sign].name}`,
    chart.asc !== null ? `, Ascendant ${SIGNS[Math.floor(chart.asc / 30)].name}.` : '. Birth time unknown.',
  ].join(' ');

  return (
    <svg className={s.wheel} viewBox="-330 -330 660 660" role="img" aria-label={label}>
      {/* Sign band */}
      {SIGNS.map((sign, i) => {
        const start = i * 30;
        const [x1, y1] = pt(R.outer, start);
        const [x2, y2] = pt(R.signIn, start);
        const [gx, gy] = pt((R.tickIn + R.signIn) / 2, start + 15);
        return (
          <g key={sign.key}>
            <path d={sector(pt, R.signIn, R.outer, start, start + 30)} fill={ELEMENT_COLORS[sign.element]} fillOpacity={0.08} />
            <line x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} className={s.divider} />
            <text x={f(gx)} y={f(gy)} className={`glyph ${s.signGlyph}`} fill={ELEMENT_COLORS[sign.element]} dominantBaseline="central" textAnchor="middle">
              {sign.glyph}
            </text>
          </g>
        );
      })}

      {/* Degree ticks */}
      <g className={s.ticks}>
        {Array.from({ length: 360 }, (_, d) => {
          if (d % 30 === 0) return null;
          const len = d % 10 === 0 ? 9 : d % 5 === 0 ? 6 : 3;
          const [x1, y1] = pt(R.signIn, d);
          const [x2, y2] = pt(R.signIn + len, d);
          return <line key={d} x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} />;
        })}
      </g>

      {/* Rings */}
      <circle r={R.outer} className={s.ringStrong} />
      <circle r={R.signIn} className={s.ringStrong} />
      <circle r={R.core} className={s.core} />

      {/* Houses (whole sign) */}
      {chart.houses && (
        <g className={s.houses}>
          {chart.houses.map((cusp, i) => {
            const [x1, y1] = pt(R.signIn, cusp);
            const [x2, y2] = pt(R.core, cusp);
            const [nx, ny] = pt(R.houseNum, cusp + 15);
            return (
              <g key={cusp}>
                <line x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} />
                <text x={f(nx)} y={f(ny)} dominantBaseline="central" textAnchor="middle" className={s.houseNum}>
                  {i + 1}
                </text>
              </g>
            );
          })}
        </g>
      )}

      {/* Angles */}
      {chart.asc !== null && chart.mc !== null && (
        <g className={s.angles}>
          {[
            { lon: chart.asc, label: 'AC', main: true },
            { lon: chart.asc + 180, label: 'DC', main: false },
            { lon: chart.mc, label: 'MC', main: true },
            { lon: chart.mc + 180, label: 'IC', main: false },
          ].map(({ lon, label: l, main }) => {
            const [x1, y1] = pt(R.outer + 4, lon);
            const [x2, y2] = pt(R.core, lon);
            const [lx, ly] = pt(R.outer + 17, lon);
            return (
              <g key={l}>
                <line x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} strokeWidth={main ? 2 : 1.2} />
                <text x={f(lx)} y={f(ly)} dominantBaseline="central" textAnchor="middle" className={main ? s.angleMain : undefined}>
                  {l}
                </text>
              </g>
            );
          })}
        </g>
      )}

      {/* Aspect lines */}
      <g>
        {lines.map((a) => {
          const [x1, y1] = pt(R.core, lonOf(a.a));
          const [x2, y2] = pt(R.core, lonOf(a.b));
          const lit = !focus || a.a === focus || a.b === focus;
          return (
            <line
              key={`${a.a}-${a.b}`}
              x1={f(x1)}
              y1={f(y1)}
              x2={f(x2)}
              y2={f(y2)}
              stroke={a.def.color}
              strokeWidth={a.orb < 2 ? 1.7 : 1.1}
              strokeOpacity={lit ? Math.max(0.35, 0.95 - a.orb * 0.08) : 0.08}
              strokeDasharray={a.def.kind === 'sextile' ? '5 4' : undefined}
              className={s.aspect}
            />
          );
        })}
      </g>

      {/* Planets */}
      <g>
        {chart.placements.map((p) => {
          const body = bodyByKey(p.body);
          const shown = spread.get(p.body) ?? p.lon;
          const [gx, gy] = pt(R.glyph, shown);
          const [dx, dy] = pt(R.degree, shown);
          const [t1x, t1y] = pt(R.signIn, p.lon);
          const [t2x, t2y] = pt(R.signIn - 10, p.lon);
          const [cx, cy] = pt(R.signIn - 12, p.lon);
          const [ix, iy] = pt(R.core, p.lon);
          const dim = focus && focus !== p.body;
          const desc = `${body.name} in ${SIGNS[p.sign].name} ${formatDegree(p.lon)}${p.house ? `, house ${p.house}` : ''}${p.retrograde ? ', retrograde' : ''}`;
          return (
            <g
              key={p.body}
              className={s.planet}
              opacity={dim ? 0.28 : 1}
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
              <line x1={f(t1x)} y1={f(t1y)} x2={f(t2x)} y2={f(t2y)} stroke={body.color} strokeWidth={2} />
              <line x1={f(cx)} y1={f(cy)} x2={f(gx)} y2={f(gy)} className={s.leader} />
              <circle cx={f(ix)} cy={f(iy)} r={2.6} fill={body.color} />
              <circle cx={f(gx)} cy={f(gy)} r={17} className={s.hit} />
              <text x={f(gx)} y={f(gy)} className={`glyph ${s.planetGlyph}`} fill={body.color} fontSize={23 * Math.min(1.1, body.weight)} dominantBaseline="central" textAnchor="middle">
                {body.glyph}
              </text>
              <text x={f(dx)} y={f(dy)} className={s.degree} dominantBaseline="central" textAnchor="middle">
                {p.degree}°{String(p.minute).padStart(2, '0')}
                {p.retrograde ? ' ℞' : ''}
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

/** Pushes crowded planets apart so their glyphs never overlap. Returns display longitudes. */
function spreadOut(points: { key: BodyKey; lon: number }[], gap = 10): Map<BodyKey, number> {
  const items = points.map((p) => ({ ...p, shown: p.lon })).sort((a, b) => a.lon - b.lon);
  for (let pass = 0; pass < 60; pass++) {
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
