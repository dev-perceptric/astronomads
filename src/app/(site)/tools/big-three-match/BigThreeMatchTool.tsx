'use client';

import Link from 'next/link';
import { useChart } from '@/components/useChart';
import type { Chart } from '@/lib/astro/chart';
import { BIG3_MATCH, type Big3Pair } from '@/lib/astro/interpretations/pairs';
import { relation } from '@/lib/zodiac/signs';
import { Blank, PairBar, PointMark, ResultHead, SignMark, partStyles as p, signName, usePair } from '../_tool/parts';

type Pt = 'sun' | 'moon' | 'asc';
const PTS: Pt[] = ['sun', 'moon', 'asc'];
const NAME: Record<Pt, string> = { sun: 'Sun', moon: 'Moon', asc: 'rising' };
const signs = (c: Chart): Partial<Record<Pt, number>> => ({
  sun: c.placements.find((x) => x.body === 'sun')!.sign,
  moon: c.placements.find((x) => x.body === 'moon')!.sign,
  ...(c.asc !== null ? { asc: Math.floor(c.asc / 30) } : {}),
});
const keyOf = (x: Pt, y: Pt) => [x, y].sort((m, n) => PTS.indexOf(m) - PTS.indexOf(n)).join('-') as Big3Pair;

export default function BigThreeMatchTool() {
  const pair = usePair();
  const ca = useChart(pair.a);
  const cb = useChart(pair.b);
  if (!pair.a || !pair.b || !ca || !cb) return <Blank />;
  const sa = signs(ca);
  const sb = signs(cb);
  const na = pair.a.name.split(' ')[0];
  const nb = pair.b.name.split(' ')[0];
  const rows = PTS.flatMap((x) => PTS.map((y) => ({ x, y }))).filter(({ x, y }) => sa[x] !== undefined && sb[y] !== undefined);
  const rels = rows.map(({ x, y }) => ({ x, y, rel: relation(sa[x]!, sb[y]!) }));
  const easy = rels.filter((r) => r.rel.tone === 'easy').length;
  const tense = rels.filter((r) => r.rel.tone === 'tense').length;

  return (
    <>
      <PairBar a={pair.a} b={pair.b} exampleA={pair.exampleA} exampleB={pair.exampleB} choose={pair.choose} swap={pair.swap} />
      <ResultHead kicker="Big three match" title={`${na} and ${nb}: ${easy} easy, ${tense} lively, ${rels.length - easy - tense} mixed`}>
        <p>Every pairing of your Sun, Moon and rising with theirs, read by how far apart the signs sit on the zodiac.{sa.asc === undefined || sb.asc === undefined ? ' Add both birth times to include the rising signs.' : ''}</p>
      </ResultHead>

      <div className={p.scroll}>
        <table className={p.table}>
          <thead>
            <tr>
              <th />
              {PTS.filter((y) => sb[y] !== undefined).map((y) => (
                <th key={y}>
                  {nb}’s {NAME[y]}: {signName(sb[y]!)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PTS.filter((x) => sa[x] !== undefined).map((x) => (
              <tr key={x}>
                <td>
                  <span className={p.cellRow}>
                    <PointMark k={x} size={24} /> {na}’s {NAME[x]}: <SignMark sign={sa[x]!} size={16} /> {signName(sa[x]!)}
                  </span>
                </td>
                {PTS.filter((y) => sb[y] !== undefined).map((y) => {
                  const r = relation(sa[x]!, sb[y]!);
                  return (
                    <td key={y} data-tone={r.tone}>
                      <strong>{r.label}</strong>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className={p.contacts}>
        {rels.map(({ x, y, rel }) => (
          <li key={`${x}${y}`}>
            <span className={p.cellRow}>
              <SignMark sign={sa[x]!} size={22} /> <SignMark sign={sb[y]!} size={22} />
            </span>
            <div className={p.listMain}>
              <p>
                {na}’s {NAME[x]} in {signName(sa[x]!)}, {nb}’s {NAME[y]} in {signName(sb[y]!)}
              </p>
              <p className={p.listMeta}>{rel.label}</p>
              <p style={{ margin: '6px 0 0', fontSize: 18 }}>{BIG3_MATCH[keyOf(x, y)][rel.kind]}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className={p.actions}>
        <Link href={`/compatibility?${new URLSearchParams({ an: pair.a.name, ad: pair.a.date, ac: String(pair.a.city.id), ...(pair.a.time ? { at: pair.a.time } : {}), bn: pair.b.name, bd: pair.b.date, bc: String(pair.b.city.id), ...(pair.b.time ? { bt: pair.b.time } : {}) })}`} className="nm-btn nm-btn-primary">
          Full love compatibility
        </Link>
        <Link href={`/compatibility/${[sa.sun!, sb.sun!].sort((m, n) => m - n).map((i) => signName(i).toLowerCase()).join('-and-')}`} className="nm-btn nm-btn-outline">
          {signName(Math.min(sa.sun!, sb.sun!))} and {signName(Math.max(sa.sun!, sb.sun!))} compatibility
        </Link>
      </div>
    </>
  );
}
