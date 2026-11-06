'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Glyph } from '@/components/Glyph';
import { useChart } from '@/components/useChart';
import { BODIES, bodyByKey, type BodyKey } from '@/lib/astro/constants';
import { SYNASTRY } from '@/lib/astro/interpretations/synastry';
import { relate } from '@/lib/astro/relate';
import { Blank, Note, PersonBar, PointMark, ResultHead, SignMark, Switch, birthDateLabel, partStyles as p, signName, usePerson } from '../_tool/parts';

type Celeb = { name: string; occupation: string; field: string; date: string; wiki: string; moonSure: boolean; fame: number; lons: { body: BodyKey; lon: number }[] };
const FIELDS = ['All', 'Film and TV', 'Music', 'Sports', 'Writers', 'Science', 'Builders', 'Art and fashion', 'Activists'] as const;

function useCelebs(): Celeb[] | null | 'error' {
  const [list, setList] = useState<Celeb[] | null | 'error'>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const res = await fetch('/data/celebs.json');
          if (!res.ok) throw new Error(String(res.status));
          const data = (await res.json()) as { people: (string | number)[][] };
          if (cancelled) return;
          setList(
            data.people.map((r) => ({
              name: r[0] as string,
              occupation: r[1] as string,
              field: r[2] as string,
              date: r[3] as string,
              wiki: r[4] as string,
              moonSure: r[5] === 1,
              fame: r[6] as number,
              lons: BODIES.map((b, i) => ({ body: b.key, lon: (r[7 + i] as number) / 10 })),
            })),
          );
          return;
        } catch {
          await new Promise((res) => setTimeout(res, 400 * 2 ** attempt));
        }
      }
      if (!cancelled) setList('error');
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return list;
}

export default function CelebrityMatchTool() {
  const { profile, isExample, choose } = usePerson();
  const chart = useChart(profile);
  const celebs = useCelebs();
  const [field, setField] = useState<(typeof FIELDS)[number]>('All');
  const scored = useMemo(() => {
    if (!chart || !Array.isArray(celebs)) return null;
    // Rank by compatibility first, with fame as a lighter weight, so the top matches are people you know.
    const rank = (x: { c: Celeb; r: { overall: number } }) => x.r.overall * 0.75 + (x.c.fame / 10) * 0.25;
    return celebs.map((c) => ({ c, r: relate(chart.placements, c.lons, 'love') })).sort((x, y) => rank(y) - rank(x));
  }, [chart, celebs]);
  if (!profile || !chart) return <Blank />;
  if (celebs === 'error') return <p className="error">The famous charts are unavailable right now. Refresh the page to try again.</p>;
  if (!scored) return <Blank />;

  const sun = chart.placements.find((x) => x.body === 'sun')!.sign;
  const moon = chart.placements.find((x) => x.body === 'moon')!.sign;
  const shown = scored.filter((x) => field === 'All' || x.c.field === field).slice(0, 12);
  const twins = scored.filter((x) => Math.floor(x.c.lons[0].lon / 30) === sun && x.c.moonSure && Math.floor(x.c.lons[1].lon / 30) === moon).sort((a, b) => b.c.fame - a.c.fame).slice(0, 12);
  const first = profile.name.split(' ')[0];

  return (
    <>
      <PersonBar profile={profile} isExample={isExample} choose={choose} label="Whose chart?" />
      <ResultHead kicker="Celebrity match" title={`${first}’s best match: ${scored[0].c.name}`}>
        <p>
          We compared your chart with {scored.length.toLocaleString('en-GB')} famous people and scored each pair with our love compatibility engine. Their charts use noon on their birthday, so houses are left out and their Moon can be off by a few degrees.
        </p>
      </ResultHead>
      <div className={p.controls}>
        <Switch label="Field" value={field} onChange={setField} options={FIELDS.map((f) => ({ value: f, label: f }))} />
      </div>

      <ol className={p.contacts}>
        {shown.map(({ c, r }, i) => {
          const top = r.contacts.filter((x, k, all) => all.findIndex((y) => y.key === x.key && y.def.tone === x.def.tone) === k).slice(0, 2);
          return (
            <li key={c.name}>
              <span className={p.cellRow} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                <span className={p.scoreNum}>{r.overall}</span>
                <span className={p.listMeta}>#{i + 1}</span>
              </span>
              <div className={p.listMain}>
                <p>
                  <a href={`https://en.wikipedia.org/wiki/${c.wiki}`} target="_blank" rel="noreferrer">
                    {c.name}
                  </a>
                </p>
                <p className={p.listMeta}>
                  {c.occupation} · born {birthDateLabel(c.date)} · <SignMark sign={Math.floor(c.lons[0].lon / 30)} size={14} /> {signName(Math.floor(c.lons[0].lon / 30))} Sun
                </p>
                {top.map((t, j) => (
                  <p key={j} style={{ margin: '8px 0 0', fontSize: 17 }}>
                    <span className={p.cellRow}>
                      <PointMark k={t.a} size={20} /> <Glyph name={t.def.kind} size={12} color={t.def.color} weight={2} /> <PointMark k={t.b} size={20} /> Your {bodyByKey(t.a).name} {t.def.kind} their {bodyByKey(t.b).name}.
                    </span>{' '}
                    {SYNASTRY[t.key]?.[t.def.tone]}
                  </p>
                ))}
              </div>
            </li>
          );
        })}
      </ol>

      <div className={p.block}>
        <ResultHead kicker="Chart twins" title={`Famous people with a ${signName(sun)} Sun and ${signName(moon)} Moon`}>
          <p>They share your two lights. Only people whose Moon stayed in one sign for their whole birthday are listed.</p>
        </ResultHead>
        {twins.length === 0 ? (
          <Note>No one in the list shares this exact pair. It is a rare mix.</Note>
        ) : (
          <ul className={p.list}>
            {twins.map(({ c }) => (
              <li key={c.name}>
                <span className={p.listDate}>{birthDateLabel(c.date)}</span>
                <div className={p.listMain}>
                  <p>
                    <a href={`https://en.wikipedia.org/wiki/${c.wiki}`} target="_blank" rel="noreferrer">
                      {c.name}
                    </a>
                  </p>
                  <p className={p.listMeta}>{c.occupation}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Note>Famous people from Pantheon 2025 (CC BY-SA 4.0). Positions calculated by Astronomads for noon UTC on each birthday.</Note>

      <div className={p.actions}>
        <Link href="/compatibility" className="nm-btn nm-btn-primary">
          Compare with someone you know
        </Link>
        <Link href={`/zodiac/${['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'][sun]}`} className="nm-btn nm-btn-outline">
          More famous {signName(sun)} people
        </Link>
      </div>
    </>
  );
}
