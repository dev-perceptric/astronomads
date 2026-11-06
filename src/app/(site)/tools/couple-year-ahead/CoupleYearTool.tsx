'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Glyph } from '@/components/Glyph';
import { useChart } from '@/components/useChart';
import { bodyByKey, type BodyKey } from '@/lib/astro/constants';
import { COUPLE_YEAR, type CouplePoint, type SlowPlanet } from '@/lib/astro/interpretations/pairs';
import { TRANSIT_SLOW } from '@/lib/astro/interpretations/transitsSlow';
import { composite, exactHits, SLOW } from '@/lib/astro/relate';
import { Blank, Note, PairBar, PointMark, ResultHead, partStyles as p, shortDate, usePair } from '../_tool/parts';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const POINT_NAME: Record<string, string> = { sun: 'Sun', moon: 'Moon', venus: 'Venus', asc: 'Ascendant' };

export default function CoupleYearTool() {
  const pair = usePair();
  const qs = useSearchParams().toString();
  const ca = useChart(pair.a);
  const cb = useChart(pair.b);
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  const hits = useMemo(() => {
    if (!ca || !cb || !pair.a || !pair.b || !now) return null;
    const c = composite(ca, cb, pair.a.city.lat, pair.b.city.lat);
    const lon = (ch: typeof ca, k: BodyKey) => ch.placements.find((x) => x.body === k)!.lon;
    const targets = [
      ...(['sun', 'moon', 'venus'] as const).map((k) => ({ key: `us:${k}`, lon: lon(c, k) })),
      ...(c.asc !== null ? [{ key: 'us:asc', lon: c.asc }] : []),
    ];
    const personal = (who: 'a' | 'b', ch: typeof ca) => (['sun', 'moon', 'venus'] as const).map((k) => ({ key: `${who}:${k}`, lon: lon(ch, k) }));
    const to = new Date(now.getTime() + 365 * 86400e3);
    return [...exactHits(SLOW, targets, now, to), ...exactHits(['jupiter', 'saturn'], [...personal('a', ca), ...personal('b', cb)], now, to)].sort((x, y) => x.date.getTime() - y.date.getTime());
  }, [ca, cb, pair.a, pair.b, now]);
  if (!pair.a || !pair.b || !hits) return <Blank />;
  const na = pair.a.name.split(' ')[0];
  const nb = pair.b.name.split(' ')[0];
  const months = new Map<string, typeof hits>();
  for (const h of hits) {
    const k = `${h.date.getUTCFullYear()}-${String(h.date.getUTCMonth()).padStart(2, '0')}`;
    months.set(k, [...(months.get(k) ?? []), h]);
  }
  const who = (key: string) => {
    const [w, pt] = key.split(':');
    return { w, pt, label: w === 'us' ? `your relationship’s ${POINT_NAME[pt]}` : `${w === 'a' ? na : nb}’s ${POINT_NAME[pt]}` };
  };

  return (
    <>
      <PairBar a={pair.a} b={pair.b} exampleA={pair.exampleA} exampleB={pair.exampleB} choose={pair.choose} swap={pair.swap} />
      <ResultHead kicker="Your year ahead together" title={`${na} and ${nb}: ${hits.length} key dates in the next 12 months`}>
        <p>The slow planets meeting your composite chart (the relationship’s own chart), and Jupiter and Saturn meeting each of you. A planet can cross the same point up to three times as it turns retrograde, so some contacts repeat.</p>
      </ResultHead>
      {(!pair.a.time || !pair.b.time) && <Note>Add both birth times to include the relationship’s Ascendant.</Note>}

      {[...months.entries()].map(([k, list]) => {
        const [y, m] = k.split('-').map(Number);
        return (
          <div key={k} className={p.block}>
            <ResultHead kicker={String(y)} title={MONTHS[m]} />
            <ul className={p.contacts}>
              {list.map((h, i) => {
                const t = who(h.target);
                const text = t.w === 'us' ? COUPLE_YEAR[h.mover as SlowPlanet][t.pt as CouplePoint][h.def.tone] : TRANSIT_SLOW[h.mover as SlowPlanet][t.pt]?.[h.def.tone];
                return (
                  <li key={i}>
                    <span className={p.listDate}>
                      {shortDate(h.date)}
                      <br />
                      <span className={p.cellRow}>
                        <PointMark k={h.mover} size={24} /> <Glyph name={h.def.kind} size={13} color={h.def.color} weight={2} />
                      </span>
                    </span>
                    <div className={p.listMain}>
                      <p>
                        {bodyByKey(h.mover).name} {h.def.kind} {t.label}
                      </p>
                      <p style={{ margin: '6px 0 0', fontSize: 18 }}>{t.w === 'us' ? text : `For ${t.w === 'a' ? na : nb}: ${text}`}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      <div className={p.actions}>
        <Link href={`/tools/best-dates?${qs}`} className="nm-btn nm-btn-primary">
          Best dates together
        </Link>
        <Link href={`/tools/composite-chart?${qs}`} className="nm-btn nm-btn-outline">
          Your composite chart
        </Link>
      </div>
    </>
  );
}
