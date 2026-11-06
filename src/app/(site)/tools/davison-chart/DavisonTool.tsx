'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useChart } from '@/components/useChart';
import { davison } from '@/lib/astro/relate';
import RelChart from '../_tool/RelChart';
import { Blank, PairBar, ResultHead, partStyles as p, dateLabel, signName, timeLabel, usePair } from '../_tool/parts';

const place = (lat: number, lon: number) => `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lon).toFixed(2)}°${lon >= 0 ? 'E' : 'W'}`;

export default function DavisonTool() {
  const pair = usePair();
  const qs = useSearchParams().toString();
  const ca = useChart(pair.a);
  const cb = useChart(pair.b);
  const d = useMemo(() => (ca && cb && pair.a && pair.b ? davison(ca, cb, pair.a.city, pair.b.city) : null), [ca, cb, pair.a, pair.b]);
  if (!pair.a || !pair.b || !d) return <Blank />;
  const na = pair.a.name.split(' ')[0];
  const nb = pair.b.name.split(' ')[0];
  const sun = d.chart.placements.find((x) => x.body === 'sun')!.sign;
  return (
    <>
      <PairBar a={pair.a} b={pair.b} exampleA={pair.exampleA} exampleB={pair.exampleB} choose={pair.choose} swap={pair.swap} />
      <ResultHead kicker="Davison chart" title={`${na} and ${nb}: born ${dateLabel(d.utc)}`}>
        <p>
          The relationship’s own birth moment: {dateLabel(d.utc)} at {timeLabel(d.utc)} UTC, at {place(d.lat, d.lon)}, halfway between your births in time and in place. A real sky with a {signName(sun)} Sun.
        </p>
      </ResultHead>
      <RelChart chart={d.chart} name={`${na} and ${nb} Davison`} />
      <div className={p.actions}>
        <Link href={`/tools/composite-chart?${qs}`} className="nm-btn nm-btn-primary">
          Composite chart
        </Link>
        <Link href={`/tools/synastry-chart?${qs}`} className="nm-btn nm-btn-outline">
          Synastry chart
        </Link>
      </div>
    </>
  );
}
