'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useChart } from '@/components/useChart';
import { composite } from '@/lib/astro/relate';
import RelChart from '../_tool/RelChart';
import { Blank, PairBar, ResultHead, partStyles as p, signName, usePair } from '../_tool/parts';

export default function CompositeTool() {
  const pair = usePair();
  const qs = useSearchParams().toString();
  const ca = useChart(pair.a);
  const cb = useChart(pair.b);
  const c = useMemo(() => (ca && cb && pair.a && pair.b ? composite(ca, cb, pair.a.city.lat, pair.b.city.lat) : null), [ca, cb, pair.a, pair.b]);
  if (!pair.a || !pair.b || !c) return <Blank />;
  const na = pair.a.name.split(' ')[0];
  const nb = pair.b.name.split(' ')[0];
  const sun = c.placements.find((x) => x.body === 'sun')!.sign;
  return (
    <>
      <PairBar a={pair.a} b={pair.b} exampleA={pair.exampleA} exampleB={pair.exampleB} choose={pair.choose} swap={pair.swap} />
      <ResultHead kicker="Composite chart" title={`${na} and ${nb}: a ${signName(sun)} Sun bond${c.asc !== null ? ` with ${signName(Math.floor(c.asc / 30))} rising` : ''}`}>
        <p>Each planet sits at the midpoint between {na}’s and {nb}’s, so this one chart describes the relationship itself: its purpose, its feelings and how it meets the world.</p>
      </ResultHead>
      <RelChart chart={c} name={`${na} and ${nb} composite`} />
      <div className={p.actions}>
        <Link href={`/tools/davison-chart?${qs}`} className="nm-btn nm-btn-primary">
          Davison chart
        </Link>
        <Link href={`/tools/synastry-chart?${qs}`} className="nm-btn nm-btn-outline">
          Synastry chart
        </Link>
        <Link href={`/tools/couple-year-ahead?${qs}`} className="nm-btn nm-btn-outline">
          Your year ahead together
        </Link>
      </div>
    </>
  );
}
