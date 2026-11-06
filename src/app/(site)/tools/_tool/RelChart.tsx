'use client';

import { Glyph } from '@/components/Glyph';
import ChartWheel from '@/components/ChartWheel';
import type { Chart } from '@/lib/astro/chart';
import { bodyByKey, isNode } from '@/lib/astro/constants';
import { aspectReading, ordinal, pointName } from '@/lib/astro/interpretations';
import { REL_IN_HOUSE, REL_IN_SIGN, REL_POINT, type RelPoint } from '@/lib/astro/interpretations/relationship';
import { Note, PointMark, Reading, Readings, ResultHead, SignMark, SignTile, Tiles, degLabel, partStyles as p, signName } from './parts';

const POINTS: RelPoint[] = ['sun', 'moon', 'mercury', 'venus', 'mars', 'asc'];
const HOUSED = ['sun', 'moon', 'venus', 'mars'] as const;

/** The relationship read as its own chart: composite or Davison. */
export default function RelChart({ chart, name }: { chart: Chart; name: string }) {
  const signOf = (k: RelPoint) => (k === 'asc' ? (chart.asc === null ? null : Math.floor(chart.asc / 30)) : chart.placements.find((x) => x.body === k)!.sign);
  const lonOf = (k: RelPoint) => (k === 'asc' ? chart.asc : chart.placements.find((x) => x.body === k)!.lon);
  const aspects = chart.aspects.filter((a) => !isNode(a.a) && !isNode(a.b) && ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'asc', 'mc'].includes(a.a) && ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'asc', 'mc'].includes(a.b)).slice(0, 12);

  return (
    <>
      <Tiles>
        {(['sun', 'moon', 'venus', 'asc'] as RelPoint[]).map((k) => {
          const s = signOf(k);
          if (s === null) return null;
          const h = k === 'asc' ? null : chart.placements.find((x) => x.body === k)!.house;
          return <SignTile key={k} k={k} label={`${k === 'asc' ? 'Ascendant' : pointName(k)}${h ? `, ${ordinal(h)} house` : ''}`} sign={s} lon={lonOf(k)!} />;
        })}
      </Tiles>
      {!chart.houses && <Note>Add both birth times to see the Ascendant and the houses of this chart.</Note>}

      {chart.houses && (
        <div className={p.wheel}>
          <ChartWheel chart={chart} name={name} ground="light" />
        </div>
      )}

      <Readings>
        {POINTS.map((k) => {
          const s = signOf(k);
          if (s === null) return null;
          return (
            <Reading key={k} kicker={k === 'asc' ? 'Ascendant' : pointName(k)} title={<><SignMark sign={s} /> {k === 'asc' ? 'Ascendant' : pointName(k)} in {signName(s)}</>}>
              <p className={p.listMeta}>{REL_POINT[k]}</p>
              <p>{REL_IN_SIGN[k][s]}</p>
            </Reading>
          );
        })}
        {chart.houses &&
          HOUSED.map((k) => {
            const h = chart.placements.find((x) => x.body === k)!.house!;
            return (
              <Reading key={`h${k}`} kicker="House" title={<><PointMark k={k} size={30} /> {pointName(k)} in the {ordinal(h)} house</>}>
                <p>{REL_IN_HOUSE[k][h - 1]}</p>
              </Reading>
            );
          })}
      </Readings>

      {aspects.length > 0 && (
        <div className={p.block}>
          <ResultHead kicker="Inside the chart" title="Aspects in the relationship" />
          <ul className={p.contacts}>
            {aspects.map((a, i) => (
              <li key={i}>
                <span className={p.cellRow}>
                  <PointMark k={a.a} size={28} /> <Glyph name={a.def.kind} size={14} color={a.def.color} weight={2} /> <PointMark k={a.b} size={28} />
                </span>
                <div className={p.listMain}>
                  <p>
                    {pointName(a.a)} {a.def.kind} {pointName(a.b)}
                  </p>
                  <p className={p.listMeta}>Orb {degLabel(a.orb)}</p>
                  <p style={{ margin: '6px 0 0', fontSize: 18 }}>{aspectReading(a)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={p.scroll}>
        <table className={p.table}>
          <thead>
            <tr>
              <th>Planet</th>
              <th>Sign</th>
              <th>Degree</th>
              {chart.houses && <th>House</th>}
            </tr>
          </thead>
          <tbody>
            {chart.placements.map((x) => (
              <tr key={x.body}>
                <td>
                  <span className={p.cellRow}>
                    <PointMark k={x.body} size={24} /> {bodyByKey(x.body).name}
                  </span>
                </td>
                <td>
                  <span className={p.cellRow}>
                    <SignMark sign={x.sign} size={16} /> {signName(x.sign)}
                  </span>
                </td>
                <td>{degLabel(x.lon)}</td>
                {chart.houses && <td>{ordinal(x.house!)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
