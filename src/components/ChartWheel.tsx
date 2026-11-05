'use client';

import { useMemo, useState } from 'react';
import type { Chart, PointKey } from '@/lib/astro/chart';
import { formatDegree } from '@/lib/astro/chart';
import { BODIES, ELEMENT_COLORS, SIGNS, bodyByKey, norm, type BodyKey, type Element } from '@/lib/astro/constants';
import s from './ChartWheel.module.css';

const R = {
  outer: 300,
  tickIn: 289,
  signIn: 246,
  orb: 211,
  degree: 178,
  field: 150,
  thread: 138,
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

  // Rising sign sits on the left; the zodiac runs counterclockwise.
  const theta = (lon: number) => ((180 + (lon - base)) * Math.PI) / 180;
  const pt = (r: number, lon: number): [number, number] => [r * Math.cos(theta(lon)), -r * Math.sin(theta(lon))];
  const f = (n: number) => +n.toFixed(2);

  const spread = useMemo(() => spreadOut(chart.placements.map((p) => ({ key: p.body, lon: p.lon }))), [chart]);

  const dominant = (Object.entries(chart.elements) as [Element, number][]).sort((a, b) => b[1] - a[1])[0][0];
  const total = Object.values(chart.elements).reduce((a, b) => a + b, 0) || 1;

  const threads = chart.aspects.filter((a) => a.def.kind !== 'conjunction' && a.a !== 'mc' && a.b !== 'mc');
  const lonOf = (k: PointKey) => (k === 'asc' ? chart.asc! : k === 'mc' ? chart.mc! : chart.placements.find((p) => p.body === k)!.lon);

  const sun = chart.placements.find((p) => p.body === 'sun')!;
  const moon = chart.placements.find((p) => p.body === 'moon')!;
  const label = [
    name ? `${name}’s birth chart.` : 'Birth chart.',
    `Sun in ${SIGNS[sun.sign].name}, Moon in ${SIGNS[moon.sign].name}`,
    chart.asc !== null ? `, rising ${SIGNS[Math.floor(chart.asc / 30)].name}.` : '. Birth time unknown.',
  ].join(' ');

  return (
    <svg className={s.wheel} viewBox="-330 -330 660 660" role="img" aria-label={label}>
      <defs>
        <radialGradient id="field">
          <stop offset="0%" stopColor={ELEMENT_COLORS[dominant]} stopOpacity="0.26" />
          <stop offset="60%" stopColor={ELEMENT_COLORS[dominant]} stopOpacity="0.07" />
          <stop offset="100%" stopColor={ELEMENT_COLORS[dominant]} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="veil">
          <stop offset="70%" stopColor="#c8baff" stopOpacity="0" />
          <stop offset="88%" stopColor="#c8baff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#c8baff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="core">
          <stop offset="0%" stopColor="#fffaf0" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#f6eed6" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#f6eed6" stopOpacity="0" />
        </radialGradient>
        {BODIES.map((b) => (
          <radialGradient key={b.key} id={`orb-${b.key}`}>
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor={b.color} />
            <stop offset="100%" stopColor={b.color} stopOpacity="0.85" />
          </radialGradient>
        ))}
        {BODIES.map((b) => (
          <radialGradient key={`halo-${b.key}`} id={`halo-${b.key}`}>
            <stop offset="0%" stopColor={b.color} stopOpacity="0.55" />
            <stop offset="100%" stopColor={b.color} stopOpacity="0" />
          </radialGradient>
        ))}
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>

      {/* Atmosphere */}
      <circle r={R.outer + 20} fill="url(#veil)" />
      <circle r={R.field} fill="url(#field)" />

      {/* Rings */}
      <g className={s.rings} fill="none">
        <circle r={R.outer} pathLength={1} className={s.draw} />
        <circle r={R.tickIn} pathLength={1} className={s.draw} opacity={0.5} />
        <circle r={R.signIn} pathLength={1} className={s.draw} />
        <circle r={R.field} pathLength={1} className={s.draw} opacity={0.55} />
      </g>

      {/* Degree ticks */}
      <g className={s.ticks}>
        {Array.from({ length: 360 }, (_, d) => {
          const len = d % 10 === 0 ? 11 : d % 5 === 0 ? 7 : 3.5;
          const [x1, y1] = pt(R.outer, d);
          const [x2, y2] = pt(R.outer - len, d);
          return <line key={d} x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} opacity={d % 30 === 0 ? 0.9 : d % 10 === 0 ? 0.55 : 0.3} />;
        })}
      </g>

      {/* Signs */}
      <g>
        {SIGNS.map((sign, i) => {
          const start = i * 30;
          const [x1, y1] = pt(R.tickIn, start);
          const [x2, y2] = pt(R.signIn, start);
          const [gx, gy] = pt((R.tickIn + R.signIn) / 2, start + 15);
          return (
            <g key={sign.key}>
              <path d={sector(pt, R.signIn, R.tickIn, start, start + 30)} fill={ELEMENT_COLORS[sign.element]} opacity={0.045} />
              <line x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} className={s.divider} />
              <text x={f(gx)} y={f(gy)} className={`glyph ${s.signGlyph}`} fill={ELEMENT_COLORS[sign.element]} dominantBaseline="central" textAnchor="middle">
                {sign.glyph}
              </text>
            </g>
          );
        })}
      </g>

      {/* Houses (whole sign) */}
      {chart.houses && (
        <g className={s.houses}>
          {chart.houses.map((cusp, i) => {
            const [x1, y1] = pt(R.signIn, cusp);
            const [x2, y2] = pt(R.field, cusp);
            const [nx, ny] = pt(R.field + 13, cusp + 15);
            return (
              <g key={i}>
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
            { lon: chart.asc, label: 'ASC' },
            { lon: chart.asc + 180, label: 'DSC' },
            { lon: chart.mc, label: 'MC' },
            { lon: chart.mc + 180, label: 'IC' },
          ].map(({ lon, label: l }) => {
            const [x1, y1] = pt(R.outer + 2, lon);
            const [x2, y2] = pt(R.field, lon);
            const [lx, ly] = pt(R.outer + 16, lon);
            return (
              <g key={l}>
                <line x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} />
                <text x={f(lx)} y={f(ly)} dominantBaseline="central" textAnchor="middle">
                  {l}
                </text>
              </g>
            );
          })}
        </g>
      )}

      {/* Constellation: aspect threads drawn as curved light */}
      <g className={s.threads}>
        {threads.map((a, i) => {
          const [x1, y1] = pt(R.thread, lonOf(a.a));
          const [x2, y2] = pt(R.thread, lonOf(a.b));
          const cx = (x1 + x2) * 0.28;
          const cy = (y1 + y2) * 0.28;
          const lit = !focus || a.a === focus || a.b === focus;
          return (
            <path
              key={`${a.a}-${a.b}`}
              d={`M${f(x1)} ${f(y1)} Q${f(cx)} ${f(cy)} ${f(x2)} ${f(y2)}`}
              stroke={a.def.color}
              strokeWidth={Math.max(0.6, 1.9 - a.orb * 0.18)}
              strokeOpacity={lit ? Math.max(0.28, 0.85 - a.orb * 0.07) : 0.07}
              fill="none"
              style={{ animationDelay: `${0.9 + i * 0.05}s` }}
            />
          );
        })}
        {chart.placements.map((p) => {
          const [x, y] = pt(R.thread, p.lon);
          return (
            <g key={p.body} className={s.star} style={{ animationDelay: '0.8s' }}>
              <circle cx={f(x)} cy={f(y)} r={5} fill={bodyByKey(p.body).color} opacity={0.35} filter="url(#soft)" />
              <circle cx={f(x)} cy={f(y)} r={1.8} fill="#fffaf0" />
            </g>
          );
        })}
      </g>

      {/* Element star */}
      <ElementStar elements={chart.elements} total={total} />

      {/* Planets */}
      <g>
        {chart.placements.map((p, i) => {
          const body = bodyByKey(p.body);
          const shown = spread.get(p.body) ?? p.lon;
          const [ox, oy] = pt(R.orb, shown);
          const [t1x, t1y] = pt(R.signIn, p.lon);
          const [t2x, t2y] = pt(R.signIn - 9, p.lon);
          const [dx, dy] = pt(R.degree, shown);
          const r = 13 * body.weight;
          const dim = focus && focus !== p.body;
          const desc = `${body.name} in ${SIGNS[p.sign].name} ${formatDegree(p.lon)}${p.house ? `, house ${p.house}` : ''}${p.retrograde ? ', retrograde' : ''}`;
          return (
            <g
              key={p.body}
              className={s.planet}
              style={{ animationDelay: `${0.35 + i * 0.07}s` }}
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
              <g className={s.dimmable} opacity={dim ? 0.3 : 1}>
              <line x1={f(t1x)} y1={f(t1y)} x2={f(t2x)} y2={f(t2y)} stroke={body.color} strokeWidth={1.6} />
              <circle cx={f(ox)} cy={f(oy)} r={r * 2.3} fill={`url(#halo-${p.body})`} />
              <circle cx={f(ox)} cy={f(oy)} r={r} fill={`url(#orb-${p.body})`} />
              <text x={f(ox)} y={f(oy)} className={`glyph ${s.planetGlyph}`} fontSize={15.5 * body.weight} dominantBaseline="central" textAnchor="middle">
                {body.glyph}
              </text>
              <text x={f(dx)} y={f(dy)} className={s.degree} dominantBaseline="central" textAnchor="middle">
                {p.degree}°{p.retrograde ? 'r' : ''}
              </text>
              </g>
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

/** Pushes crowded planets apart so their orbs never overlap. Returns display longitudes. */
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

function ElementStar({ elements, total }: { elements: Record<Element, number>; total: number }) {
  // Fire points up, air right, water down, earth left. Ray length follows each element's share.
  const order: { el: Element; angle: number }[] = [
    { el: 'fire', angle: -90 },
    { el: 'air', angle: 0 },
    { el: 'water', angle: 90 },
    { el: 'earth', angle: 180 },
  ];
  const pts: string[] = [];
  const tips: { x: number; y: number; el: Element }[] = [];
  order.forEach(({ el, angle }, i) => {
    const len = 22 + 88 * (elements[el] / total);
    const a = (angle * Math.PI) / 180;
    const x = len * Math.cos(a);
    const y = len * Math.sin(a);
    tips.push({ x, y, el });
    const mid = ((angle + 45) * Math.PI) / 180;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`, `${(7 * Math.cos(mid)).toFixed(1)},${(7 * Math.sin(mid)).toFixed(1)}`);
    void i;
  });
  const title = order.map(({ el }) => `${el} ${elements[el]}`).join(', ');
  return (
    <g className={s.elementStar}>
      <title>{`Element balance: ${title}`}</title>
      <circle r={34} fill="url(#core)" />
      <polygon points={pts.join(' ')} fill="#fffaf0" fillOpacity={0.16} stroke="#fffaf0" strokeOpacity={0.55} strokeWidth={0.8} />
      {tips.map((t) => (
        <circle key={t.el} cx={t.x} cy={t.y} r={2.6} fill={ELEMENT_COLORS[t.el]} />
      ))}
      <circle r={3.2} fill="#fffaf0" />
    </g>
  );
}
