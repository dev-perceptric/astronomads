'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useChart } from '@/components/useChart';
import { DAY_KIND, EASY_DAY } from '@/lib/astro/interpretations/pairs';
import { bestDates, type DayKind } from '@/lib/astro/relate';
import { Blank, PairBar, Reading, Readings, ResultHead, SignMark, Switch, partStyles as p, dateLabel, signName, usePair } from '../_tool/parts';

const KINDS: DayKind[] = ['romance', 'talk', 'adventure', 'home', 'plans', 'care'];

export default function BestDatesTool() {
  const pair = usePair();
  const qs = useSearchParams().toString();
  const ca = useChart(pair.a);
  const cb = useChart(pair.b);
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  const [kind, setKind] = useState<DayKind | 'all'>('all');
  const days = useMemo(() => (ca && cb && now ? bestDates(ca, cb, now, 90) : null), [ca, cb, now]);
  if (!pair.a || !pair.b || !days) return <Blank />;
  const na = pair.a.name.split(' ')[0];
  const nb = pair.b.name.split(' ')[0];
  const ranked = days.filter((d) => (kind === 'all' || d.kind === kind) && d.score > 0).sort((x, y) => y.score - x.score);
  // For all kinds, take the two best days of each kind first, so the list has variety.
  const picked = kind === 'all' ? KINDS.flatMap((k) => ranked.filter((d) => d.kind === k).slice(0, 2)) : [];
  const best = [...picked, ...ranked.filter((d) => !picked.includes(d))].slice(0, 12).sort((x, y) => x.date.getTime() - y.date.getTime());
  const easy = days.filter((d) => d.tension > 1.2).sort((x, y) => y.tension - x.tension).slice(0, 5).sort((x, y) => x.date.getTime() - y.date.getTime());

  return (
    <>
      <PairBar a={pair.a} b={pair.b} exampleA={pair.exampleA} exampleB={pair.exampleB} choose={pair.choose} swap={pair.swap} />
      <ResultHead kicker="The next 90 days" title={`Best dates for ${na} and ${nb}`}>
        <p>Each day is scored from the Moon, Mercury, Venus, Mars and Jupiter meeting both of your charts. Days that reach both of you rank higher.</p>
      </ResultHead>
      <div className={p.controls}>
        <Switch label="Kind of day" value={kind} onChange={setKind} options={[{ value: 'all', label: 'All' }, ...KINDS.map((k) => ({ value: k, label: DAY_KIND[k].title }))]} />
      </div>

      <ul className={p.contacts}>
        {best.map((d) => (
          <li key={d.date.getTime()}>
            <span className={p.listDate}>{dateLabel(d.date)}</span>
            <div className={p.listMain}>
              <p>{DAY_KIND[d.kind].title}</p>
              <p className={p.listMeta}>
                <span className={p.cellRow}>
                  Moon in <SignMark sign={d.moonSign} size={14} /> {signName(d.moonSign)}
                </span>
              </p>
              <p style={{ margin: '6px 0 0', fontSize: 18 }}>{DAY_KIND[d.kind].text}</p>
              <p className={p.listMeta}>Ideas: {DAY_KIND[d.kind].ideas.join(', ')}.</p>
            </div>
          </li>
        ))}
      </ul>

      {easy.length > 0 && (
        <div className={p.block}>
          <ResultHead kicker="Go easy" title="Days to keep simple">
            <p>{EASY_DAY}</p>
          </ResultHead>
          <ul className={p.list}>
            {easy.map((d) => (
              <li key={d.date.getTime()}>
                <span className={p.listDate}>{dateLabel(d.date)}</span>
                <div className={p.listMain}>
                  <span className={p.cellRow}>
                    Moon in <SignMark sign={d.moonSign} size={16} /> {signName(d.moonSign)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={p.block}>
        <ResultHead kicker="Kinds of days" title="What each day favors" />
        <Readings>
          {KINDS.map((k) => (
            <Reading key={k} title={DAY_KIND[k].title}>
              <p>{DAY_KIND[k].text}</p>
              <ul>
                {DAY_KIND[k].ideas.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Reading>
          ))}
        </Readings>
      </div>

      <div className={p.actions}>
        <Link href={`/tools/couple-year-ahead?${qs}`} className="nm-btn nm-btn-primary">
          Your year ahead together
        </Link>
        <Link href={`/compatibility?${qs}`} className="nm-btn nm-btn-outline">
          Compatibility scores
        </Link>
      </div>
    </>
  );
}
