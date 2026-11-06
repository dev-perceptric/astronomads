'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Glyph, type SignKey } from '@/components/Glyph';
import { Glyph3D } from '@/components/Glyph3D';
import Stipple from '@/components/Stipple';
import PersonPicker from '@/components/site/PersonPicker';
import { useChart } from '@/components/useChart';
import { ELEMENT_COLORS, SIGNS, bodyByKey, type Element } from '@/lib/astro/constants';
import { SYNASTRY, THEME_TEXT } from '@/lib/astro/interpretations/synastry';
import { THEMES, synastry, type Theme } from '@/lib/astro/synastry';
import { pairQuery, useProfileParam } from '@/lib/people';
import type { BirthProfile } from '@/lib/profile';
import { SIGN_COPY } from '@/lib/zodiac/copy';
import { relation } from '@/lib/zodiac/signs';
import s from './compat.module.css';

const band = (n: number) => (n < 45 ? 'low' : n < 70 ? 'mid' : 'high');
const cap = (t: string) => t[0].toUpperCase() + t.slice(1);
const first = (name: string) => name.split(' ')[0];

export default function CompatView() {
  const params = new URLSearchParams(useSearchParams().toString());
  const a = useProfileParam(params, 'a');
  const b = useProfileParam(params, 'b');
  if (a === null || b === null) return <section className={`nm-section nm-void ${s.blank}`} />;
  if (a === 'error' || b === 'error') return <Pick initialA={null} initialB={null} error="This link has a birth detail we can't read. Choose the two people again." />;
  if (a === 'none' || b === 'none') return <Pick initialA={a === 'none' ? null : a} initialB={b === 'none' ? null : b} />;
  return <Result a={a} b={b} />;
}

function Pick({ initialA, initialB, error }: { initialA: BirthProfile | null; initialB: BirthProfile | null; error?: string }) {
  const router = useRouter();
  const [a, setA] = useState(initialA);
  const [b, setB] = useState(initialB);
  return (
    <>
      <section className={`nm-section nm-void ${s.hero}`}>
        <Stipple kind="field" tone="astral" className={s.field} />
        <div className={`nm-bracket ${s.heroFrame}`}>
          <p className="nm-label">Compatibility</p>
          <h1 className={`${s.title} fade-up`}>Two charts, one story</h1>
          <p className={s.lead}>Compare two full birth charts, every planet with every planet. See where you click, where you grow, and how you talk.</p>
        </div>
      </section>
      <section className={`nm-section nm-marble ${s.pick}`}>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <div className={s.pickGrid}>
          <PersonPicker label="Person one" value={a} onChange={setA} />
          <span className={s.and} aria-hidden="true">
            &amp;
          </span>
          <PersonPicker label="Person two" value={b} onChange={setB} />
        </div>
        <div className={s.pickActions}>
          <button className="nm-btn nm-btn-primary" disabled={!a || !b} onClick={() => a && b && router.push(`/compatibility?${pairQuery(a, b)}`)}>
            Compare charts
          </button>
        </div>
      </section>
    </>
  );
}

function Result({ a, b }: { a: BirthProfile; b: BirthProfile }) {
  const ca = useChart(a);
  const cb = useChart(b);
  const r = useMemo(() => (ca && cb ? synastry(ca, cb) : null), [ca, cb]);
  if (!ca || !cb || !r) return <section className={`nm-section nm-void ${s.blank}`} />;

  const sunA = ca.placements.find((p) => p.body === 'sun')!.sign;
  const sunB = cb.placements.find((p) => p.body === 'sun')!.sign;
  const rel = relation(sunA, sunB);
  const signLine = SIGN_COPY[SIGNS[sunA].key as SignKey]?.matches[SIGNS[sunB].key as SignKey];
  const elems: Element[] = ['fire', 'earth', 'air', 'water'];
  const total = (c: typeof ca) => elems.reduce((t, e) => t + c.elements[e], 0) || 1;

  return (
    <>
      <section className={`nm-section nm-void ${s.hero}`}>
        <Stipple kind="field" tone="astral" className={s.field} />
        <div className={`nm-bracket ${s.heroFrame} ${s.resultHero}`}>
          <p className="nm-label">Compatibility</p>
          <h1 className={`${s.names} fade-up`}>
            {first(a.name)} <span className={s.amp}>&amp;</span> {first(b.name)}
          </h1>
          <div className={s.scoreRow}>
            <Ring value={r.overall} />
            <div className={s.suns}>
              <p className={s.sunLine}>
                <Glyph name={SIGNS[sunA].key as SignKey} size={26} color={ELEMENT_COLORS[SIGNS[sunA].element]} weight={1.8} /> {SIGNS[sunA].name} Sun
                <span className={s.dim}> and </span>
                <Glyph name={SIGNS[sunB].key as SignKey} size={26} color={ELEMENT_COLORS[SIGNS[sunB].element]} weight={1.8} /> {SIGNS[sunB].name} Sun
                <span className={s.relTag}>{rel.label}</span>
              </p>
              {signLine && <p className={s.signLine}>{signLine}</p>}
              <p className={s.small}>
                Built from {r.contacts.length} contacts between your two charts{!ca.timeKnown || !cb.timeKnown ? ', with one birth time unknown' : ''}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`nm-section nm-marble ${s.themes}`}>
        <p className="nm-label">01 Scores</p>
        <h2 className="nm-title">Where you meet</h2>
        <div className={s.themeList}>
          {THEMES.map((t: Theme) => (
            <div key={t} className={s.theme}>
              <div className={s.themeHead}>
                <span className={s.themeName}>{THEME_TEXT[t].title}</span>
                <span className={s.themeNum}>{r.scores[t]}</span>
              </div>
              <div className={s.bar} role="img" aria-label={`${THEME_TEXT[t].title}: ${r.scores[t]} out of 100`}>
                <span style={{ width: `${r.scores[t]}%` }} />
              </div>
              <p className={s.themeText}>{THEME_TEXT[t][band(r.scores[t])]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`nm-section nm-void ${s.contacts}`}>
        <p className="nm-label">02 Your strongest contacts</p>
        <h2 className="nm-title">What happens between you</h2>
        <ul className={s.contactList}>
          {r.contacts.slice(0, 8).map((c, i) => (
            <li key={i} className={s.contact}>
              <span className={s.trio}>
                <Glyph3D name={c.a} size={34} color={bodyByKey(c.a).color} ground="dark" />
                <Glyph name={c.def.kind} size={18} color={c.def.color} weight={2} />
                <Glyph3D name={c.b} size={34} color={bodyByKey(c.b).color} ground="dark" />
              </span>
              <div>
                <p className={s.contactName}>
                  {first(a.name)}&apos;s {bodyByKey(c.a).name} {c.def.kind} {first(b.name)}&apos;s {bodyByKey(c.b).name}
                </p>
                <p className={s.contactText}>{SYNASTRY[c.key]?.[c.def.tone]}</p>
              </div>
              <span className={s.orb}>{c.orb.toFixed(1)}°</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={`nm-section nm-marble ${s.blend}`}>
        <p className="nm-label">03 Elements</p>
        <h2 className="nm-title">Your mix of fire, earth, air and water</h2>
        <div className={s.blendGrid}>
          {[
            [a, ca],
            [b, cb],
          ].map(([p, c]) => (
            <div key={(p as BirthProfile).name}>
              <p className={s.blendName}>{(p as BirthProfile).name}</p>
              {elems.map((e) => {
                const n = (c as typeof ca).elements[e];
                return (
                  <div key={e} className={s.blendRow}>
                    <span>{cap(e)}</span>
                    <span className={s.blendBar}>
                      <span style={{ width: `${(n / total(c as typeof ca)) * 100}%`, background: ELEMENT_COLORS[e] }} />
                    </span>
                    <span className={s.blendPct}>{Math.round((n / total(c as typeof ca)) * 100)}%</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      <section className={`nm-section nm-void ${s.cta}`}>
        <div className={`nm-bracket ${s.ctaFrame}`}>
          <p className="nm-label">Full report</p>
          <h2 className={s.ctaTitle}>
            {first(a.name)} and {first(b.name)}, every contact explained
          </h2>
          <p className={s.lead}>All {r.contacts.length} contacts between your charts, each of your Venus, Mars and Moon in depth, and what to work on together. Yours to keep as a page or a PDF.</p>
          <div className={s.ctaActions}>
            <Link href={`/reports/synastry?${pairQuery(a, b)}`} className="nm-btn nm-btn-primary">
              Get the full report
            </Link>
            <Link href="/compatibility" className="nm-btn nm-btn-glass">
              Compare other people
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Ring({ value }: { value: number }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 180 180" className={s.ring} role="img" aria-label={`Overall ${value} out of 100`}>
      <circle cx="90" cy="90" r={r} fill="none" stroke="var(--rule)" strokeWidth="6" />
      <circle cx="90" cy="90" r={r} fill="none" stroke="var(--astral)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(value / 100) * c} ${c}`} transform="rotate(-90 90 90)" className={s.ringArc} />
      <text x="90" y="88" textAnchor="middle" dominantBaseline="central" className={s.ringNum}>
        {value}
      </text>
      <text x="90" y="122" textAnchor="middle" className={s.ringLabel}>
        overall
      </text>
    </svg>
  );
}
