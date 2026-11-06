'use client';

import { Suspense, useMemo } from 'react';
import { Glyph3D } from '@/components/Glyph3D';
import { useChart } from '@/components/useChart';
import type { Chart } from '@/lib/astro/chart';
import { houseOf } from '@/lib/astro/chart';
import { bodyByKey, norm, type BodyKey } from '@/lib/astro/constants';
import { HOUSE_SYSTEMS, frameOf, houseCusps } from '@/lib/astro/houses';
import { ordinal } from '@/lib/astro/interpretations';
import { Blank, Note, PersonBar, SignMark, degLabel, partStyles as p, signOfLon, usePerson } from '@/app/(site)/tools/_tool/parts';
import w from './widgets.module.css';

/* ---------- Hemispheres and quadrants ---------- */

const WEIGHT: Record<BodyKey, number> = { sun: 3, moon: 3, mercury: 2, venus: 2, mars: 2, jupiter: 1.5, saturn: 1.5, uranus: 1, neptune: 1, pluto: 1 };
const sep = (a: number, b: number) => Math.abs(((a - b + 540) % 360) - 180);

/** Each planet's half and quarter, counted from the exact angles, with its weight. */
export function distribution(c: Chart) {
  const asc = c.asc!;
  const mc = c.mc!;
  const ic = norm(mc + 180);
  const dsc = norm(asc + 180);
  return c.placements.map((pl) => {
    const angular = [asc, mc, ic, dsc].some((a) => sep(pl.lon, a) <= 8);
    const lower = norm(pl.lon - asc) < 180;
    const east = norm(pl.lon - mc) < 180;
    const quadrant = lower ? (east ? 1 : 2) : east ? 4 : 3;
    return { body: pl.body, lon: pl.lon, lower, east, quadrant, angular, weight: WEIGHT[pl.body] * (angular ? 1.5 : 1) };
  });
}

function Distribution() {
  const { profile, isExample, choose } = usePerson();
  const chart = useChart(profile);
  if (!profile || !chart) return <Blank />;
  if (chart.asc === null) {
    return (
      <>
        <PersonBar profile={profile} isExample={isExample} choose={choose} />
        <Note>Hemispheres and quadrants need a birth time, since the horizon and the meridian turn with the clock. Add your time with Change.</Note>
      </>
    );
  }
  const d = distribution(chart);
  const total = d.reduce((t, x) => t + x.weight, 0);
  const row = (label: string, pick: (x: (typeof d)[number]) => boolean) => {
    const xs = d.filter(pick);
    const weight = xs.reduce((t, x) => t + x.weight, 0);
    return { label, count: xs.length, pct: Math.round((weight / total) * 100), xs };
  };
  const halves = [row('Upper (south)', (x) => !x.lower), row('Lower (north)', (x) => x.lower), row('East', (x) => x.east), row('West', (x) => !x.east)];
  const quads = [row('I · houses 1 to 3', (x) => x.quadrant === 1), row('II · houses 4 to 6', (x) => x.quadrant === 2), row('III · houses 7 to 9', (x) => x.quadrant === 3), row('IV · houses 10 to 12', (x) => x.quadrant === 4)];
  const topQ = quads.reduce((a, b) => (b.pct > a.pct ? b : a));
  // Wheel: Ascendant on the left, zodiac counterclockwise.
  const R = 120;
  const at = (r: number, lon: number): [number, number] => {
    const t = ((180 + lon - chart.asc!) * Math.PI) / 180;
    return [r * Math.cos(t), -r * Math.sin(t)];
  };
  const quadPath = (from: number, to: number) => {
    const [x1, y1] = at(R, from);
    const [x2, y2] = at(R, to);
    const span = norm(to - from);
    return `M0 0 L${x1} ${y1} A${R} ${R} 0 ${span > 180 ? 1 : 0} 0 ${x2} ${y2} Z`;
  };
  const ic = norm(chart.mc! + 180);
  const dsc = norm(chart.asc! + 180);
  const bounds: [number, number][] = [
    [chart.asc!, ic],
    [ic, dsc],
    [dsc, chart.mc!],
    [chart.mc!, chart.asc!],
  ];

  const Table = ({ rows }: { rows: ReturnType<typeof row>[] }) => (
    <table className={p.table}>
      <thead>
        <tr>
          <th>Region</th>
          <th>Count</th>
          <th>Weighted</th>
          <th>Planets</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <td>{r.label}</td>
            <td>{r.count}</td>
            <td>
              <span className={w.meter}>
                <span style={{ width: `${r.pct}%` }} />
              </span>{' '}
              {r.pct}%
            </td>
            <td>
              <span className={p.cellRow}>
                {r.xs.map((x) => (
                  <span key={x.body} title={`${bodyByKey(x.body).name}${x.angular ? ', near an angle' : ''}`} className={x.angular ? w.angular : undefined}>
                    <Glyph3D name={x.body} size={20} color={bodyByKey(x.body).color} ground="light" />
                  </span>
                ))}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className={w.box}>
      <PersonBar profile={profile} isExample={isExample} choose={choose} />
      <div className={w.grid}>
        <svg viewBox="-160 -160 320 320" className={w.wheel} role="img" aria-label={`Planets around the horizon and meridian. Strongest quadrant: ${topQ.label}.`}>
          {bounds.map(([a, b], i) => (
            <path key={i} d={quadPath(a, b)} style={{ fill: `color-mix(in oklch, var(--astral) ${Math.round(quads[i].pct * 0.5)}%, transparent)` }} />
          ))}
          <circle r={R} className={w.ring} />
          {[chart.asc!, chart.mc!].map((a) => {
            const [x1, y1] = at(R + 6, a);
            const [x2, y2] = at(R + 6, a + 180);
            return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} className={w.axis} />;
          })}
          {(
            [
              ['AC', chart.asc!],
              ['DC', dsc],
              ['MC', chart.mc!],
              ['IC', ic],
            ] as const
          ).map(([l, lon]) => {
            const [x, y] = at(R + 20, lon);
            return (
              <text key={l} x={x} y={y + 4} textAnchor="middle" className={w.angle}>
                {l}
              </text>
            );
          })}
          {d.map((x, i) => {
            const [px, py] = at(R - 18 - (i % 3) * 22, x.lon);
            return (
              <g key={x.body} transform={`translate(${px - 10} ${py - 10})`}>
                <Glyph3D name={x.body} size={20} color={bodyByKey(x.body).color} ground="light" />
              </g>
            );
          })}
        </svg>
        <div className={w.tables}>
          <Table rows={halves} />
          <Table rows={quads} />
        </div>
      </div>
      <Note>Weights: Sun and Moon 3, Mercury, Venus and Mars 2, Jupiter and Saturn 1.5, Uranus, Neptune and Pluto 1, and half again within 8° of an angle (outlined). Counted from the exact angles, so the result is the same in every house system.</Note>
    </div>
  );
}

/* ---------- House systems compared ---------- */

function Compare() {
  const { profile, isExample, choose } = usePerson();
  const chart = useChart(profile);
  const rows = useMemo(() => {
    if (!profile || !chart || chart.asc === null) return null;
    const { ramc, eps } = frameOf(chart.utc, profile.city.lon);
    return HOUSE_SYSTEMS.map((s) => ({ s, cusps: houseCusps(s.key, ramc, eps, profile.city.lat) }));
  }, [profile, chart]);
  if (!profile || !chart) return <Blank />;
  if (!rows) {
    return (
      <>
        <PersonBar profile={profile} isExample={isExample} choose={choose} />
        <Note>House systems need a birth time and place. Add your time with Change.</Note>
      </>
    );
  }
  const base = rows.find((r) => r.s.key === 'placidus')?.cusps ?? rows.find((r) => r.s.key === 'whole-sign')!.cusps!;
  const baseHouse = (lon: number) => houseOf(lon, base);

  return (
    <div className={w.box}>
      <PersonBar profile={profile} isExample={isExample} choose={choose} />
      <p className={p.smallLabel} style={{ margin: '0 0 10px' }}>
        Where each planet falls
      </p>
      <div className={p.scroll}>
        <table className={`${p.table} ${w.compare}`}>
          <thead>
            <tr>
              <th>System</th>
              {chart.placements.map((x) => (
                <th key={x.body} title={bodyByKey(x.body).name}>
                  <Glyph3D name={x.body} size={20} color={bodyByKey(x.body).color} ground="light" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ s, cusps }) => (
              <tr key={s.key}>
                <td>
                  <strong>{s.name}</strong>
                  <br />
                  <span className={w.era}>{s.era}</span>
                </td>
                {chart.placements.map((x) => {
                  if (!cusps) return <td key={x.body}>·</td>;
                  const h = houseOf(x.lon, cusps);
                  return (
                    <td key={x.body} className={h !== baseHouse(x.lon) ? w.diff : undefined}>
                      {h}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Note>Shaded cells differ from Placidus. A dot means the system has no answer at this latitude and time.</Note>

      <p className={p.smallLabel} style={{ margin: '24px 0 10px' }}>
        Every cusp
      </p>
      <div className={p.scroll}>
        <table className={`${p.table} ${w.cusps}`}>
          <thead>
            <tr>
              <th>System</th>
              {Array.from({ length: 12 }, (_, i) => (
                <th key={i}>{ordinal(i + 1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ s, cusps }) => (
              <tr key={s.key}>
                <td>{s.name}</td>
                {cusps
                  ? cusps.map((c, i) => (
                      <td key={i}>
                        <span className={p.cellRow}>
                          {degLabel(c)} <SignMark sign={signOfLon(c)} size={12} />
                        </span>
                      </td>
                    ))
                  : Array.from({ length: 12 }, (_, i) => <td key={i}>·</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DistributionWidget() {
  return (
    <Suspense fallback={<Blank />}>
      <Distribution />
    </Suspense>
  );
}

export function HouseCompareWidget() {
  return (
    <Suspense fallback={<Blank />}>
      <Compare />
    </Suspense>
  );
}
