'use client';

import { useId, useMemo, useState } from 'react';
import type { Chart, PointKey } from '@/lib/astro/chart';
import { formatDegree } from '@/lib/astro/chart';
import { ELEMENT_COLORS, SIGNS, bodyByKey, norm, type BodyKey } from '@/lib/astro/constants';
import { GlyphAt, type SignKey } from './Glyph';
import { Glyph3DAt } from './Glyph3D';
import s from './ChartWheel.module.css';

/**
 * The Astronomads astrolabe. Radii, outside in; the drawing is 880 units wide, centered on 0,0.
 * Planets sit outside as solid 3D symbols, tied to their exact degree by a thin line in their own color.
 * Inside, in closed bands: a dotted degree scale, the sign ring with spaced names, the house band
 * (cusp lines and Roman numerals live only here) and the aspect disc.
 */
const R = {
  label: 400, // degree and minute
  glyph: 356, // planet symbol center
  sphere: 20, // room each symbol takes
  frame: 318, // thin double frame around the scale
  scaleOut: 310,
  rim: 286, // heavy circle, outer edge of the sign ring
  signName: 271,
  signGlyph: 237,
  zodiacIn: 206, // sign ring: nothing ever crosses it
  houseNum: 183,
  core: 160, // aspect disc
};

type Props = {
  /** The section behind the wheel, so the symbols' depth and shadow suit it */
  ground?: 'dark' | 'light';
  chart: Chart;
  name?: string;
  selected?: BodyKey | null;
  onSelect?: (body: BodyKey | null) => void;
};

type Outer = { key: PointKey; lon: number };

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

export default function ChartWheel({ chart, name, selected = null, onSelect, ground = 'dark' }: Props) {
  const uid = useId().replace(/:/g, '');
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
  const spread = useMemo(() => spreadOut(outer, 12.5), [outer]);
  const lonOf = (k: PointKey) => outer.find((o) => o.key === k)!.lon;

  const stars = useMemo(() => makeStars(), []);

  const aspectLines = chart.aspects.filter((a) => a.def.kind !== 'conjunction' || a.orb < 3);

  const sun = chart.placements.find((p) => p.body === 'sun')!;
  const moon = chart.placements.find((p) => p.body === 'moon')!;
  const label = [
    name ? `${name}’s birth chart.` : 'Birth chart.',
    `Sun in ${SIGNS[sun.sign].name}, Moon in ${SIGNS[moon.sign].name}`,
    chart.asc !== null ? `, Ascendant in ${SIGNS[Math.floor(chart.asc / 30)].name}.` : '. Birth time unknown.',
  ].join(' ');

  /** An arc for a sign's name that always reads left to right. */
  const nameArc = (start: number) => {
    const mid = start + 15;
    const [, my] = pt(R.signName, mid);
    const a = start + 3;
    const b = start + 27;
    if (my <= 0) {
      // Top half: run clockwise on screen, from the higher longitude to the lower.
      const [x1, y1] = pt(R.signName, b);
      const [x2, y2] = pt(R.signName, a);
      return `M${f(x1)} ${f(y1)} A${R.signName} ${R.signName} 0 0 1 ${f(x2)} ${f(y2)}`;
    }
    const [x1, y1] = pt(R.signName, a);
    const [x2, y2] = pt(R.signName, b);
    return `M${f(x1)} ${f(y1)} A${R.signName} ${R.signName} 0 0 0 ${f(x2)} ${f(y2)}`;
  };

  return (
    <svg className={s.wheel} viewBox="-440 -440 880 880" role="img" aria-label={label}>
      <defs>
        {SIGNS.map((sign, i) => (
          <path key={sign.key} id={`${uid}-n${i}`} d={nameArc(i * 30)} />
        ))}
      </defs>

      {/* Body and a thin double frame */}
      <circle r={R.frame} className={s.body} />
      <circle r={R.frame} className={s.hair} />
      <circle r={R.scaleOut} className={s.hair} />

      {/* Degree scale: a dot for every degree, a mark every ten, a long mark at each sign */}
      <g>
        {Array.from({ length: 360 }, (_, d) => {
          if (d % 10 === 0) return <line key={d} {...seg(R.rim, d % 30 === 0 ? R.scaleOut : R.rim + 14, d)} className={d % 30 === 0 ? s.tickSign : s.tick} />;
          const [x, y] = pt(R.rim + 10, d);
          return <circle key={d} cx={f(x)} cy={f(y)} r={d % 5 === 0 ? 1.6 : 0.9} className={s.degDot} />;
        })}
      </g>

      {/* Sign ring: closed band, no house or axis line ever enters it */}
      <g>
        {SIGNS.map((sign, i) => {
          const start = i * 30;
          const [gx, gy] = pt(R.signGlyph, start + 15);
          const color = ELEMENT_COLORS[sign.element];
          return (
            <g key={sign.key}>
              <path d={sector(pt, R.zodiacIn, R.rim, start, start + 30)} fill={color} className={s.signTint} />
              <line {...seg(R.zodiacIn, R.rim, start)} className={s.signDivider} />
              <GlyphAt name={sign.key as SignKey} x={gx} y={gy} size={36} color={color} weight={2.4} halo="var(--card)" />
              <text className={s.signName} dominantBaseline="central">
                <textPath href={`#${uid}-n${i}`} startOffset="50%" textAnchor="middle">
                  {sign.name.toUpperCase()}
                </textPath>
              </text>
            </g>
          );
        })}
      </g>
      <circle r={R.rim} className={s.rim} />
      <circle r={R.zodiacIn} className={s.ring} />
      <circle r={R.zodiacIn - 5} className={s.hair} />

      {/* House band: cusp lines and numerals stay between the sign ring and the aspect disc */}
      {chart.houses && (
        <g>
          {chart.houses.map((cusp, i) => {
            const isAngle = i % 3 === 0;
            const width = norm(chart.houses![(i + 1) % 12] - cusp);
            const [nx, ny] = pt(R.houseNum, cusp + width / 2);
            const [sx, sy] = pt(R.zodiacIn - 5, cusp);
            return (
              <g key={i}>
                {!isAngle && <line {...seg(R.zodiacIn - 5, R.core, cusp)} className={s.cusp} />}
                <path d={star(sx, sy, isAngle ? 7 : 5, isAngle ? 1.6 : 1.2)} className={s.cuspStar} />
                <text x={f(nx)} y={f(ny)} dominantBaseline="central" textAnchor="middle" className={width < 10 ? s.houseNumSmall : s.houseNum}>
                  {ROMAN[i]}
                </text>
              </g>
            );
          })}
        </g>
      )}

      {/* Angles: drawn in the scale band and the house band, stopping at the sign ring */}
      {chart.asc !== null && chart.mc !== null && (
        <g>
          {[
            { lon: chart.asc, main: true },
            { lon: chart.asc + 180, main: false },
            { lon: chart.mc, main: true },
            { lon: chart.mc + 180, main: false },
          ].map(({ lon, main }, i) => (
            <g key={i}>
              <line {...seg(R.rim, R.scaleOut, lon)} className={main ? s.axis : s.axisSoft} />
              <line {...seg(R.zodiacIn - 5, R.core, lon)} className={main ? s.axis : s.axisSoft} />
              {main && <path d={arrow(pt, R.frame + 1, lon)} className={s.axisHead} />}
            </g>
          ))}
        </g>
      )}

      {/* Aspect disc: an astrolabe face with a star field */}
      <circle r={R.core} className={s.core} />
      {[118, 76, 34].map((r) => (
        <circle key={r} r={r} className={s.orbit} />
      ))}
      <g className={s.coreStars}>
        {stars.map(([lon, r, size], k) => {
          const [x, y] = pt(r, lon);
          return <circle key={k} cx={f(x)} cy={f(y)} r={size} />;
        })}
      </g>
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
              strokeWidth={a.orb < 2 ? 1.9 : 1.2}
              strokeOpacity={lit ? Math.max(0.55, 1 - a.orb * 0.06) : 0.07}
              strokeDasharray={a.def.kind === 'sextile' ? '6 5' : undefined}
              className={s.aspect}
            />
          );
        })}
        {outer.map((o) => {
          const [x, y] = pt(R.core, o.lon);
          const color = o.key === 'asc' || o.key === 'mc' ? 'var(--foreground)' : bodyByKey(o.key).color;
          return <circle key={o.key} cx={f(x)} cy={f(y)} r={3.4} fill={color} className={s.anchor} />;
        })}
      </g>
      {/* The logo's mark at the center */}
      <circle r={17} className={s.centerRing} />
      <path d={star(0, 0, 12, 2.4)} className={s.centerStar} />

      {/* Points outside the wheel */}
      <g>
        {outer.map((o) => {
          const shown = spread.get(o.key) ?? o.lon;
          const isAngle = o.key === 'asc' || o.key === 'mc';
          const placement = isAngle ? null : chart.placements.find((p) => p.body === o.key)!;
          const color = isAngle ? 'var(--foreground)' : bodyByKey(o.key as BodyKey).color;
          const [ex, ey] = pt(R.frame + 1, o.lon);
          const [gx, gy] = pt(R.glyph, shown);
          // Leader stops short of the symbol.
          const [bx, by] = pt(R.glyph - R.sphere - (isAngle ? 0 : 2), shown);
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
          const pointName = isAngle ? (o.key === 'asc' ? 'Ascendant' : 'Midheaven') : bodyByKey(o.key as BodyKey).name;
          const desc = `${pointName} in ${SIGNS[Math.floor(norm(o.lon) / 30)].name} ${formatDegree(o.lon)}${placement?.house ? `, house ${placement.house}` : ''}${placement?.retrograde ? ', retrograde' : ''}`;
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
              <circle cx={f(ex)} cy={f(ey)} r={2.4} fill={color} />
              <circle cx={f(gx)} cy={f(gy)} r={R.sphere + 2} className={s.hit} />
              {isAngle ? (
                <g>
                  <circle cx={f(gx)} cy={f(gy)} r={R.sphere} className={s.angleRing} />
                  <text x={f(gx)} y={f(gy)} dominantBaseline="central" textAnchor="middle" className={s.angleText}>
                    {o.key === 'asc' ? 'AC' : 'MC'}
                  </text>
                </g>
              ) : (
                <Glyph3DAt name={body} x={f(gx) - 1} y={f(gy) - 1.5} size={42 * Math.min(1.06, Math.max(0.92, bodyByKey(body).weight))} color={color} ground={ground} weight={2.1} />
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

/** A small arrowhead on the inside of the key border, pointing out along an angle. */
function arrow(pt: (r: number, lon: number) => [number, number], r: number, lon: number) {
  const [tx, ty] = pt(r, lon);
  const spread = (5 / r) * (180 / Math.PI);
  const [lx, ly] = pt(r - 12, lon + spread);
  const [rx, ry] = pt(r - 12, lon - spread);
  return `M${tx.toFixed(2)} ${ty.toFixed(2)} L${lx.toFixed(2)} ${ly.toFixed(2)} L${rx.toFixed(2)} ${ry.toFixed(2)} Z`;
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

/** A four-point star, like the one in the logo. */
function star(x: number, y: number, k: number, w: number) {
  const pts = [[0, -k], [w, -w], [k, 0], [w, w], [0, k], [-w, w], [-k, 0], [-w, -w]];
  return pts.map(([px, py], i) => `${i ? 'L' : 'M'}${(x + px).toFixed(2)} ${(y + py).toFixed(2)}`).join(' ') + ' Z';
}

function sector(pt: (r: number, lon: number) => [number, number], r1: number, r2: number, a: number, b: number) {
  const [x1, y1] = pt(r2, a);
  const [x2, y2] = pt(r2, b);
  const [x3, y3] = pt(r1, b);
  const [x4, y4] = pt(r1, a);
  // Longitude grows counterclockwise on screen, which is sweep-flag 0 in SVG.
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${r2} ${r2} 0 0 0 ${x2.toFixed(2)} ${y2.toFixed(2)} L${x3.toFixed(2)} ${y3.toFixed(2)} A${r1} ${r1} 0 0 1 ${x4.toFixed(2)} ${y4.toFixed(2)} Z`;
}

/** A faint star field for the aspect disc, as [longitude, radius, dot size]. Fixed by longitude, so it turns with the chart. */
function makeStars() {
  let seed = 4242;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const core: [number, number, number][] = [];
  for (let i = 0; i < 90; i++) core.push([rand() * 360, Math.sqrt(rand()) * (R.core - 8), 0.5 + rand() * 0.9]);
  return core;
}
