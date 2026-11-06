'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { Glyph } from '@/components/Glyph';
import { useChart } from '@/components/useChart';
import type { Chart } from '@/lib/astro/chart';
import { bodyByKey } from '@/lib/astro/constants';
import type { Harmony } from '@/lib/astro/interpretations/angleAspects';
import { MODE_THEMES, relate, type RelMode } from '@/lib/astro/relate';
import type { BirthProfile } from '@/lib/profile';
import { Blank, PairBar, PointMark, ResultHead, ScoreList, band, degLabel, partStyles as p, usePair } from './parts';

type ThemeText = Record<string, { title: string; low: string; mid: string; high: string }>;

/**
 * A two-chart reading for one kind of bond: five theme scores, then every contact between the charts
 * in that bond's words. Love, friendship, work and family share it.
 */
export default function RelateView({
  mode,
  themes,
  contacts,
  labels,
  kicker,
  title,
  extra,
  links,
}: {
  mode: RelMode;
  themes: ThemeText;
  contacts: Record<string, Record<Harmony, string>>;
  labels: [string, string];
  kicker: string;
  title: (a: string, b: string, overall: number) => string;
  extra?: (a: { profile: BirthProfile; chart: Chart }, b: { profile: BirthProfile; chart: Chart }) => ReactNode;
  links: { href: string; label: string }[];
}) {
  const pair = usePair();
  const ca = useChart(pair.a);
  const cb = useChart(pair.b);
  if (!pair.a || !pair.b || !ca || !cb) return <Blank />;
  const r = relate(ca.placements, cb.placements, mode);
  const first = (n: string) => n.split(' ')[0];
  const na = first(pair.a.name);
  const nb = first(pair.b.name);

  return (
    <>
      <PairBar a={pair.a} b={pair.b} exampleA={pair.exampleA} exampleB={pair.exampleB} choose={pair.choose} labels={labels} swap={pair.swap} />
      <ResultHead kicker={kicker} title={title(na, nb, r.overall)}>
        <p>
          Overall {r.overall} of 100, from {r.contacts.length} contacts between your charts. Scores run from 8 to 97, with 50 as neutral. They are a guide, built from how closely your planets meet.
        </p>
      </ResultHead>
      <ScoreList items={MODE_THEMES[mode].map((t) => ({ title: themes[t].title, score: r.scores[t], text: themes[t][band(r.scores[t])] }))} />

      {extra?.({ profile: pair.a, chart: ca }, { profile: pair.b, chart: cb })}

      <div className={p.block}>
        <ResultHead kicker="Every contact" title={`How ${na}’s planets meet ${nb}’s`} />
        <ul className={p.contacts}>
          {r.contacts.map((c, i) => (
            <li key={i}>
              <span className={p.cellRow}>
                <PointMark k={c.a} size={30} /> <Glyph name={c.def.kind} size={14} color={c.def.color} weight={2} /> <PointMark k={c.b} size={30} />
              </span>
              <div className={p.listMain}>
                <p>
                  {na}’s {bodyByKey(c.a).name} {c.def.kind} {nb}’s {bodyByKey(c.b).name}
                </p>
                <p className={p.listMeta}>Orb {degLabel(c.orb)}</p>
                <p style={{ margin: '6px 0 0', fontSize: 18 }}>{contacts[c.key]?.[c.def.tone]}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={p.actions}>
        {links.map((l, i) => (
          <Link key={l.href} href={l.href} className={`nm-btn ${i === 0 ? 'nm-btn-primary' : 'nm-btn-outline'}`}>
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}
