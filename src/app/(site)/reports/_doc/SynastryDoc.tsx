'use client';

import { useMemo } from 'react';
import { Glyph, type SignKey } from '@/components/Glyph';
import { Glyph3D } from '@/components/Glyph3D';
import { useChart } from '@/components/useChart';
import { ELEMENT_COLORS, SIGNS, bodyByKey, type BodyKey } from '@/lib/astro/constants';
import { IN_SIGN, pointName } from '@/lib/astro/interpretations';
import { SYNASTRY, THEME_TEXT } from '@/lib/astro/interpretations/synastry';
import { THEMES, synastry } from '@/lib/astro/synastry';
import type { BirthProfile } from '@/lib/profile';
import { SIGN_COPY } from '@/lib/zodiac/copy';
import { relation } from '@/lib/zodiac/signs';
import s from './doc.module.css';

const first = (n: string) => n.split(' ')[0];
const band = (n: number) => (n < 45 ? 'low' : n < 70 ? 'mid' : 'high');

/** The Compatibility Report for two people. `full` false shows the scores and a teaser. */
export default function SynastryDoc({ a, b, full }: { a: BirthProfile; b: BirthProfile; full: boolean }) {
  const ca = useChart(a);
  const cb = useChart(b);
  const r = useMemo(() => (ca && cb ? synastry(ca, cb) : null), [ca, cb]);
  if (!ca || !cb || !r) return null;
  const sunA = ca.placements.find((p) => p.body === 'sun')!.sign;
  const sunB = cb.placements.find((p) => p.body === 'sun')!.sign;
  const signLine = SIGN_COPY[SIGNS[sunA].key as SignKey]?.matches[SIGNS[sunB].key as SignKey];
  const personal: BodyKey[] = ['sun', 'moon', 'mercury', 'venus', 'mars'];

  return (
    <article className={s.doc}>
      <header className={s.cover}>
        <p className="nm-label">Compatibility Report</p>
        <h1 className={s.coverName}>
          {first(a.name)} <span className={s.amp}>&amp;</span> {first(b.name)}
        </h1>
        <p className={s.coverMeta}>
          {SIGNS[sunA].name} Sun and {SIGNS[sunB].name} Sun · {relation(sunA, sunB).label} · overall {r.overall} of 100
        </p>
        {signLine && <p className={s.lead}>{signLine}</p>}
      </header>

      <section className={s.chapter}>
        <p className={s.kicker}>Chapter 1</p>
        <h2 className={s.h2}>Where you meet</h2>
        {THEMES.map((t) => (
          <div key={t} className={s.block}>
            <h3 className={s.h3}>
              {THEME_TEXT[t].title} <span className={s.score}>{r.scores[t]}</span>
            </h3>
            <div className={s.bar}>
              <span style={{ width: `${r.scores[t]}%` }} />
            </div>
            <p className={s.p}>{THEME_TEXT[t][band(r.scores[t])]}</p>
          </div>
        ))}
      </section>

      <section className={s.chapter}>
        <p className={s.kicker}>Chapter 2</p>
        <h2 className={s.h2}>Every contact between your charts</h2>
        <ul className={s.aspects}>
          {(full ? r.contacts : r.contacts.slice(0, 2)).map((c, i) => (
            <li key={i}>
              <p className={s.aspectName}>
                <Glyph3D name={c.a} size={28} color={bodyByKey(c.a).color} ground="light" />
                <Glyph name={c.def.kind} size={14} color={c.def.color} weight={2} />
                <Glyph3D name={c.b} size={28} color={bodyByKey(c.b).color} ground="light" /> {first(a.name)}&apos;s {pointName(c.a)} {c.def.kind} {first(b.name)}&apos;s {pointName(c.b)}
              </p>
              <p className={s.aspectText}>{SYNASTRY[c.key]?.[c.def.tone]}</p>
            </li>
          ))}
        </ul>
      </section>

      {!full && (
        <div className={s.locked} aria-hidden="true">
          {r.contacts.slice(2, 6).map((c, i) => (
            <p key={i} className={s.lockedLine}>
              {pointName(c.a)} {c.def.kind} {pointName(c.b)}
            </p>
          ))}
        </div>
      )}

      {full && (
        <section className={s.chapter}>
          <p className={s.kicker}>Chapter 3</p>
          <h2 className={s.h2}>How each of you loves and talks</h2>
          {[
            [a, ca],
            [b, cb],
          ].map(([p, c]) => (
            <div key={(p as BirthProfile).name} className={s.block}>
              <h3 className={s.h3}>{(p as BirthProfile).name}</h3>
              {personal.map((k) => {
                const sign = (c as NonNullable<typeof ca>).placements.find((x) => x.body === k)!.sign;
                return (
                  <p key={k} className={s.p}>
                    <strong>
                      <Glyph name={SIGNS[sign].key as SignKey} size={16} color={ELEMENT_COLORS[SIGNS[sign].element]} weight={1.8} /> {pointName(k)} in {SIGNS[sign].name}.
                    </strong>{' '}
                    {IN_SIGN[k][sign]}
                  </p>
                );
              })}
            </div>
          ))}
          <p className={s.small}>Scores are a guide built from {r.contacts.length} contacts. Text written by Astronomads.</p>
        </section>
      )}
    </article>
  );
}
