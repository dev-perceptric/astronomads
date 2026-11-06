'use client';

import { useMemo, useState } from 'react';
import type { Chart, PointKey } from '@/lib/astro/chart';
import { formatDegree } from '@/lib/astro/chart';
import { ELEMENT_COLORS, SIGNS, bodyByKey, norm, type BodyKey } from '@/lib/astro/constants';
import { placeSignSymbols } from '@/lib/astro/layout';
import { GlyphAt, type SignKey } from './Glyph';
import s from './ChartWheel.module.css';

/**
 * Radii, outside in. The drawing is 840 units wide, centered on 0,0.
 * Planets live outside the wheel, each tied to its exact degree by a thin line in its own color.
 */
const R = {
  label: 384, // degree and minute
  glyph: 340, // planet symbol
  leaderEnd: 318,
  wheel: 290, // heavy outer circle
  houseIn: 272, // band for house numbers
  scaleIn: 250, // dense degree scale
  zodiacIn: 182, // sign ring
  core: 160, // aspect disc
};

type Props = {
  chart: Chart;
  name?: string;
  selected?: BodyKey | null;
  onSelect?: (body: BodyKey | null) => void;
};

type Outer = { key: PointKey; lon: number };

export default function ChartWheel({ chart, name, selected = null, onSelect }: Props) {
  const [hovered, setHovered] = useState<BodyKey | null>(null);
  const focus = hovered ?? selected;
  const base = chart.asc ?? 0;

  // Ascendant on the left, zodiac running counterclockwise, as in a traditional chart.
  const theta = (lon: number) => ((180 + (lon - base)) * Math.PI) / 180;
  const pt = (r: number, lon: number): [number, number] => [r * Math.cos(theta(lon)), -r * Math.sin(theta(lon))];
  const f = (n: number) => +n.toFixed(2);
  const seg = (r1: number, r2: number, lon: number) => {
    const [x1, y1] = pt(r1, lon);
    const [x2, y2] = pt(r2, lon);
    return { x1: f(x1), y1: f(y1), x2: f(x2), y2: f(y2) };
  };

  // Everything drawn outside the wheel: planets, plus the Ascendant and Midheaven when the time is known.
  const outer: Outer[] = useMemo(() => {
    const list: Outer[] = chart.placements.map((p) => ({ key: p.body, lon: p.lon }));
    if (chart.asc !== null && chart.mc !== null) list.push({ key: 'asc', lon: chart.asc }, { key: 'mc', lon: chart.mc });
    return list;
  }, [chart]);
  const spread = useMemo(() => spreadOut(outer, 11.5), [outer]);

  const lonOf = (k: PointKey) => outer.find((o) => o.key === k)!.lon;

  // Every line that crosses the sign ring: house cusps and the four angles.
  const crossing = useMemo(() => {
    const list = [...(chart.houses ?? [])];
    if (chart.asc !== null && chart.mc !== null) list.push(chart.asc, norm(chart.asc + 180), chart.mc, norm(chart.mc + 180));
    return list;
  }, [chart]);
  const signSpots = useMemo(() => placeSignSymbols(crossing, (R.scaleIn + R.zodiacIn) / 2), [crossing]);
  const aspectLines = chart.aspects.filter((a) => a.def.kind !== 'conjunction' || a.orb < 3);

  const sun = chart.placements.find((p) => p.body === 'sun')!;
  const moon = chart.placements.find((p) => p.body === 'moon')!;
  const label = [
    name ? `${name}’s birth chart.` : 'Birth chart.',
    `Sun in ${SIGNS[sun.sign].name}, Moon in ${SIGNS[moon.sign].name}`,
    chart.asc !== null ? `, Ascendant in ${SIGNS[Math.floor(chart.asc / 30)].name}.` : '. Birth time unknown.',
  ].join(' ');

  return (
    <svg className={s.wheel} viewBox="-420 -420 840 840" role="img" aria-label={label}>
      {/* Wheel body */}
      <circle r={R.wheel} className={s.wheelFill} />

      {/* Sign ring tint and dividers (symbols are drawn after the house lines, clear of them) */}
      <g>
        {SIGNS.map((sign, i) => {
          const start = i * 30;
          return (
            <g key={sign.key}>
              <path d={sector(pt, R.zodiacIn, R.scaleIn, start, start + 30)} fill={ELEMENT_COLORS[sign.element]} className={s.signSector} />
              <line {...seg(R.zodiacIn, R.scaleIn, start)} className={s.signDivider} />
            </g>
          );
        })}
      </g>

      {/* Dense degree scale */}
      <g className={s.ticks}>
        {Array.from({ length: 360 }, (_, d) => {
          const len = d % 30 === 0 ? 22 : d % 10 === 0 ? 13 : d % 5 === 0 ? 9 : 5;
          return <line key={d} {...seg(R.houseIn, R.houseIn - len, d)} className={d % 5 === 0 ? s.tickMajor : undefined} />;
        })}
      </g>
      <circle r={R.houseIn} className={s.ringThin} />
      <circle r={R.scaleIn} className={s.ringThin} />
      <circle r={R.zodiacIn} className={s.ring} />

      {/* Houses: cusp lines through the sign ring, numbers just after each cusp, triangles on the rim */}
      {chart.houses && (
        <g>
          {chart.houses.map((cusp, i) => {
            const isAngle = i % 3 === 0;
            const width = norm(chart.houses![(i + 1) % 12] - cusp);
            const [nx, ny] = pt((R.wheel + R.houseIn) / 2, cusp + width / 2);
            return (
              <g key={i}>
                {!isAngle && <line {...seg(R.houseIn, R.core, cusp)} className={s.cusp} />}
                <path d={triangle(pt, R.houseIn, cusp, isAngle ? 9 : 5.5)} className={s.cuspMark} />
                <text x={f(nx)} y={f(ny)} dominantBaseline="central" textAnchor="middle" className={s.houseNum}>
                  {i + 1}
                </text>
              </g>
            );
          })}
        </g>
      )}

      {/* Angles: heavy axes across the wheel */}
      {chart.asc !== null && chart.mc !== null && (
        <g>
          <line {...seg(R.wheel, R.core, chart.asc)} className={s.axis} />
          <line {...seg(R.wheel, R.core, chart.asc + 180)} className={s.axisSoft} />
          <line {...seg(R.wheel, R.core, chart.mc)} className={s.axis} />
          <line {...seg(R.wheel, R.core, chart.mc + 180)} className={s.axisSoft} />
        </g>
      )}

      {/* Sign symbols, each moved within its sign to the spot farthest from every house and axis line */}
      <g>
        {signSpots.map(({ key, lon, size, color }) => {
          const [gx, gy] = pt((R.scaleIn + R.zodiacIn) / 2, lon);
          return <GlyphAt key={key} name={key as SignKey} x={gx} y={gy} size={size} color={color} weight={2.6} halo="var(--card)" />;
        })}
      </g>

      <circle r={R.wheel} className={s.rim} />

      {/* Aspect disc */}
      <circle r={R.core} className={s.core} />
      <g>
        {aspectLines.map((a) => {
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
              strokeWidth={a.orb < 2 ? 2 : 1.3}
              strokeOpacity={lit ? Math.max(0.5, 1 - a.orb * 0.07) : 0.07}
              strokeDasharray={a.def.kind === 'sextile' ? '7 5' : undefined}
              className={s.aspect}
            />
          );
        })}
        {outer.map((o) => {
          const [x, y] = pt(R.core, o.lon);
          const color = o.key === 'asc' || o.key === 'mc' ? 'var(--foreground)' : bodyByKey(o.key).color;
          return <circle key={o.key} cx={f(x)} cy={f(y)} r={3.6} fill={color} className={s.anchor} />;
        })}
      </g>

      {/* Points outside the wheel */}
      <g>
        {outer.map((o) => {
          const shown = spread.get(o.key) ?? o.lon;
          const isAngle = o.key === 'asc' || o.key === 'mc';
          const placement = isAngle ? null : chart.placements.find((p) => p.body === o.key)!;
          const color = isAngle ? 'var(--foreground)' : bodyByKey(o.key as BodyKey).color;
          const [ex, ey] = pt(R.wheel + 2, o.lon);
          const [bx, by] = pt(R.leaderEnd, shown);
          const [gx, gy] = pt(R.glyph, shown);
          const [lx, ly] = pt(R.label, shown);
          // Same rounding as the positions table, so both always agree.
          const inSign = norm(o.lon) % 30;
          let deg = Math.floor(inSign);
          let min = Math.round((inSign - deg) * 60);
          if (min === 60) {
            deg += 1;
            min = 0;
          }
          const dim = focus && focus !== o.key;
          const name = isAngle ? (o.key === 'asc' ? 'Ascendant' : 'Midheaven') : bodyByKey(o.key as BodyKey).name;
          const desc = `${name} in ${SIGNS[Math.floor(norm(o.lon) / 30)].name} ${formatDegree(o.lon)}${placement?.house ? `, house ${placement.house}` : ''}${placement?.retrograde ? ', retrograde' : ''}`;
          const interactive = !isAngle;
          const body = o.key as BodyKey;
          return (
            <g
              key={o.key}
              className={interactive ? s.planet : s.point}
              opacity={dim ? 0.25 : 1}
              {...(interactive
                ? {
                    tabIndex: 0,
                    role: 'button',
                    'aria-label': desc,
                    'aria-pressed': selected === body,
                    onMouseEnter: () => setHovered(body),
                    onMouseLeave: () => setHovered(null),
                    onFocus: () => setHovered(body),
                    onBlur: () => setHovered(null),
                    onClick: () => onSelect?.(selected === body ? null : body),
                    onKeyDown: (e: React.KeyboardEvent) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelect?.(selected === body ? null : body);
                      }
                    },
                  }
                : { 'aria-label': desc })}
            >
              <title>{desc}</title>
              <line x1={f(ex)} y1={f(ey)} x2={f(bx)} y2={f(by)} stroke={color} className={s.leader} />
              <circle cx={f(gx)} cy={f(gy)} r={22} className={s.hit} />
              {isAngle ? (
                o.key === 'mc' ? (
                  <g>
                    <circle cx={f(gx)} cy={f(gy)} r={19} className={s.mcRing} />
                    <text x={f(gx)} y={f(gy)} dominantBaseline="central" textAnchor="middle" className={s.angleText}>
                      MC
                    </text>
                  </g>
                ) : (
                  <text x={f(gx)} y={f(gy)} dominantBaseline="central" textAnchor="middle" className={s.angleText}>
                    AC
                  </text>
                )
              ) : (
                <GlyphAt name={body} x={gx} y={gy} size={34 * Math.min(1.06, Math.max(0.92, bodyByKey(body).weight))} color={color} weight={2.5} />
              )}
              <text x={f(lx)} y={f(ly)} dominantBaseline="central" textAnchor="middle" className={s.degree} fill={color}>
                {deg}°<tspan className={s.minute}>{String(min).padStart(2, '0')}′</tspan>
                {placement?.retrograde && <tspan className={s.retro}> R</tspan>}
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

/** A filled triangle on the rim, pointing inward at a cusp. */
function triangle(pt: (r: number, lon: number) => [number, number], r: number, lon: number, size: number) {
  const [tx, ty] = pt(r - size * 1.5, lon);
  const spread = (size / r) * (180 / Math.PI);
  const [lx, ly] = pt(r, lon + spread);
  const [rx, ry] = pt(r, lon - spread);
  return `M${tx} ${ty} L${lx} ${ly} L${rx} ${ry} Z`;
}

/** Pushes crowded points apart so their symbols and labels never overlap. Returns display longitudes. */
function spreadOut(points: Outer[], gap: number): Map<PointKey, number> {
  const items = points.map((p) => ({ ...p, shown: p.lon })).sort((a, b) => a.lon - b.lon);
  for (let pass = 0; pass < 100; pass++) {
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

