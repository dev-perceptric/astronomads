'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import ChartWheel from '@/components/ChartWheel';
import { Glyph } from '@/components/Glyph';
import { useChart } from '@/components/useChart';
import { BODIES, bodyByKey } from '@/lib/astro/constants';
import { ordinal } from '@/lib/astro/interpretations';
import { OVERLAY, type OverlayPlanet } from '@/lib/astro/interpretations/pairs';
import { SYNASTRY } from '@/lib/astro/interpretations/synastry';
import { contactsOf, overlays } from '@/lib/astro/relate';
import { Blank, Note, PairBar, PointMark, Reading, Readings, ResultHead, Switch, degLabel, partStyles as p, usePair } from '../_tool/parts';

const OVERLAY_PLANETS: OverlayPlanet[] = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'];

export default function SynastryChartTool() {
  const pair = usePair();
  const qs = useSearchParams().toString();
  const ca = useChart(pair.a);
  const cb = useChart(pair.b);
  const [outerIs, setOuter] = useState<'a' | 'b'>('a');
  const cross = useMemo(() => (ca && cb ? (outerIs === 'a' ? contactsOf(ca.placements, cb.placements) : contactsOf(cb.placements, ca.placements)) : []), [ca, cb, outerIs]);
  if (!pair.a || !pair.b || !ca || !cb) return <Blank />;
  const na = pair.a.name.split(' ')[0];
  const nb = pair.b.name.split(' ')[0];
  const [outer, inner, no, ni] = outerIs === 'a' ? [ca, cb, na, nb] : [cb, ca, nb, na];
  const overlayIn = (guestName: string, hostName: string, guest: typeof ca, host: typeof ca) => {
    const list = overlays(guest, host).filter((o) => (OVERLAY_PLANETS as string[]).includes(o.body));
    if (!list.length) return null;
    return (
      <div className={p.block}>
        <ResultHead kicker="House overlays" title={`${guestName}’s planets in ${hostName}’s houses`}>
          <p>Where {guestName} lands in {hostName}’s life. Read these as {hostName}.</p>
        </ResultHead>
        <Readings>
          {list.map((o) => (
            <Reading key={o.body} kicker={`${ordinal(o.house)} house`} title={<><PointMark k={o.body} size={30} /> {guestName}’s {bodyByKey(o.body).name}</>}>
              <p>{OVERLAY[o.body as OverlayPlanet][o.house - 1]}</p>
            </Reading>
          ))}
        </Readings>
      </div>
    );
  };
  const grid = (row: (typeof BODIES)[number]['key'], col: (typeof BODIES)[number]['key']) => cross.find((c) => c.a === row && c.b === col);

  return (
    <>
      <PairBar a={pair.a} b={pair.b} exampleA={pair.exampleA} exampleB={pair.exampleB} choose={pair.choose} swap={pair.swap} />
      <div className={p.controls}>
        <Switch
          label="Whose chart is outside"
          value={outerIs}
          onChange={setOuter}
          options={[
            { value: 'a', label: `${na} outside` },
            { value: 'b', label: `${nb} outside` },
          ]}
        />
      </div>
      <ResultHead kicker="Synastry chart" title={`${ni}’s planets in ${no}’s chart`}>
        <p>
          {no}’s chart sits outside with its houses. {ni}’s planets sit on the inner ring, and the lines in the center are the {cross.length} contacts between your planets.
        </p>
      </ResultHead>
      {!outer.houses && <Note>{no}’s birth time is unknown, so the houses and overlays need a birth time for {no}.</Note>}
      <div className={p.wheel}>
        <ChartWheel chart={outer} name={no} ground="light" partner={inner.placements} cross={cross} />
      </div>

      {ca.houses && overlayIn(nb, na, cb, ca)}
      {cb.houses && overlayIn(na, nb, ca, cb)}

      <div className={p.block}>
        <ResultHead kicker="Aspect grid" title="Every contact at a glance">
          <p>
            Rows are {no}’s planets, columns are {ni}’s.
          </p>
        </ResultHead>
        <div className={p.scroll}>
          <table className={`${p.table} ${p.eph}`}>
            <thead>
              <tr>
                <th />
                {BODIES.map((b) => (
                  <th key={b.key} title={`${ni}’s ${b.name}`}>
                    <PointMark k={b.key} size={20} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BODIES.map((r) => (
                <tr key={r.key}>
                  <td title={`${no}’s ${r.name}`}>
                    <PointMark k={r.key} size={20} />
                  </td>
                  {BODIES.map((c) => {
                    const hit = grid(r.key, c.key);
                    return <td key={c.key}>{hit ? <span title={`${hit.def.kind}, orb ${degLabel(hit.orb)}`}><Glyph name={hit.def.kind} size={15} color={hit.def.color} weight={2} /></span> : null}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={p.block}>
        <ResultHead kicker="Strongest contacts" title="What the closest lines mean" />
        <ul className={p.contacts}>
          {cross.slice(0, 10).map((c, i) => (
            <li key={i}>
              <span className={p.cellRow}>
                <PointMark k={c.a} size={28} /> <Glyph name={c.def.kind} size={14} color={c.def.color} weight={2} /> <PointMark k={c.b} size={28} />
              </span>
              <div className={p.listMain}>
                <p>
                  {no}’s {bodyByKey(c.a).name} {c.def.kind} {ni}’s {bodyByKey(c.b).name}
                </p>
                <p className={p.listMeta}>Orb {degLabel(c.orb)}</p>
                <p style={{ margin: '6px 0 0', fontSize: 18 }}>{SYNASTRY[c.key]?.[c.def.tone]}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={p.actions}>
        <Link href={`/compatibility?${qs}`} className="nm-btn nm-btn-primary">
          Compatibility scores
        </Link>
        <Link href={`/tools/composite-chart?${qs}`} className="nm-btn nm-btn-outline">
          Composite chart
        </Link>
      </div>
    </>
  );
}
