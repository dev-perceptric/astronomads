'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ChartWheel from '@/components/ChartWheel';
import { useChart, useProfileFromUrl } from '@/components/useChart';
import { formatDegree, type Chart, type PointKey } from '@/lib/astro/chart';
import { ELEMENT_COLORS, SIGNS, bodyByKey, type BodyKey, type Element } from '@/lib/astro/constants';
import { HOUSE_REALM, natalAspectLine, placementLine } from '@/lib/astro/readings';
import { utcOffsetLabel } from '@/lib/astro/time';
import { saveProfile, type BirthProfile } from '@/lib/profile';
import s from './chart.module.css';

const pointName = (k: PointKey) => (k === 'asc' ? 'Ascendant' : k === 'mc' ? 'Midheaven' : bodyByKey(k).name);
const pointGlyph = (k: PointKey) => (k === 'asc' ? 'AC' : k === 'mc' ? 'MC' : bodyByKey(k).glyph);

export default function ChartView() {
  const params = useSearchParams();
  const state = useProfileFromUrl(new URLSearchParams(params.toString()));
  const profile = state && 'profile' in state ? state.profile : null;
  const chart = useChart(profile);
  const [selected, setSelected] = useState<BodyKey | null>(null);
  const [saved, setSaved] = useState<'idle' | 'saved' | 'failed'>('idle');

  if (!state) return null;
  if ('error' in state) {
    return (
      <div className={s.message}>
        <p className="error">{state.error}</p>
        <Link className="btn" href="/">
          Start over
        </Link>
      </div>
    );
  }
  if (!profile || !chart) {
    return (
      <div className={s.message}>
        <p className="error">This birth date or time can’t be read. Check it and draw the chart again.</p>
        <Link className="btn" href="/">
          Start over
        </Link>
      </div>
    );
  }

  const sun = chart.placements.find((p) => p.body === 'sun')!;
  const moon = chart.placements.find((p) => p.body === 'moon')!;
  const rising = chart.asc !== null ? SIGNS[Math.floor(chart.asc / 30)] : null;

  return (
    <div className={s.layout}>
      {state.isExample && (
        <div className={`panel ${s.banner}`}>
          <span>This is an example chart.</span>
          <Link className="btn btn-primary" href="/">
            Draw yours
          </Link>
        </div>
      )}

      <header className={s.head}>
        <p className="eyebrow">Birth chart</p>
        <h1 className={`display ${s.name}`}>{profile.name}</h1>
        <p className={`mono ${s.birth}`}>{birthLine(profile, chart)}</p>
        <div className={s.bigThree}>
          <BigOne label="Sun" sign={sun.sign} />
          <BigOne label="Moon" sign={moon.sign} />
          {rising ? <BigOne label="Rising" sign={SIGNS.indexOf(rising)} /> : <div className={s.big}><span className="eyebrow">Rising</span><span className={s.bigSign}>Needs birth time</span></div>}
        </div>
      </header>

      <div className={s.stage}>
        <div className={s.wheelWrap}>
          <ChartWheel chart={chart} name={profile.name} selected={selected} onSelect={setSelected} />
        </div>
        <aside className={`panel ${s.side}`} aria-live="polite">
          {selected ? <PlanetDetail chart={chart} body={selected} onClose={() => setSelected(null)} /> : <Overview chart={chart} />}
        </aside>
      </div>

      <section className={s.section}>
        <h2 className={`display ${s.h2}`}>Placements</h2>
        <ul className={s.placements}>
          {chart.placements.map((p) => {
            const b = bodyByKey(p.body);
            return (
              <li key={p.body}>
                <button className={s.placement} onClick={() => setSelected(p.body)} aria-pressed={selected === p.body}>
                  <span className={`glyph ${s.pGlyph}`} style={{ color: b.color }}>
                    {b.glyph}
                  </span>
                  <span className={s.pMain}>
                    <span className={s.pTitle}>
                      {b.name} in {SIGNS[p.sign].name}
                      {p.retrograde && <span className={s.retro}>retrograde</span>}
                    </span>
                    <span className={s.pLine}>{placementLine(p.body, p.sign)}</span>
                  </span>
                  <span className={`mono ${s.pMeta}`}>
                    {formatDegree(p.lon)}
                    {p.house && <span> · H{p.house}</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={s.section}>
        <h2 className={`display ${s.h2}`}>Aspects</h2>
        {chart.aspects.length === 0 ? (
          <p className={s.muted}>No close aspects.</p>
        ) : (
          <ul className={s.aspects}>
            {chart.aspects.slice(0, 14).map((a) => (
              <li key={`${a.a}-${a.b}`} className={s.aspect}>
                <span className={`glyph ${s.aGlyphs}`}>
                  {pointGlyph(a.a)} <span style={{ color: a.def.color }}>{a.def.glyph}</span> {pointGlyph(a.b)}
                </span>
                <span className={s.aMain}>
                  <span className={s.pTitle}>
                    {pointName(a.a)} {a.def.kind} {pointName(a.b)}
                  </span>
                  <span className={s.pLine}>{natalAspectLine(a.a, a.def.kind, a.b)}</span>
                </span>
                <span className={`mono ${s.pMeta}`}>{a.orb.toFixed(1)}°</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {!state.isExample && !state.isSaved && (
        <div className={s.saveRow}>
          <button
            className="btn"
            onClick={() => setSaved(saveProfile(profile) ? 'saved' : 'failed')}
            disabled={saved === 'saved'}
          >
            {saved === 'saved' ? 'Saved as my chart' : 'Save as my chart'}
          </button>
          {saved === 'failed' && <p className="error">This browser blocked saving. Allow site data and try again.</p>}
        </div>
      )}
    </div>
  );
}

function birthLine(p: BirthProfile, chart: Chart) {
  const [y, m, d] = p.date.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const time = p.time ? `${p.time} (${utcOffsetLabel(chart.utc, p.city.timeZone)})` : 'time unknown';
  return `${date} · ${time} · ${[p.city.name, p.city.country].filter(Boolean).join(', ')}`;
}

function BigOne({ label, sign }: { label: string; sign: number }) {
  const sg = SIGNS[sign];
  return (
    <div className={s.big}>
      <span className="eyebrow">{label}</span>
      <span className={s.bigSign}>
        <span className="glyph" style={{ color: ELEMENT_COLORS[sg.element] }}>
          {sg.glyph}
        </span>{' '}
        {sg.name}
      </span>
    </div>
  );
}

function Overview({ chart }: { chart: Chart }) {
  const total = Object.values(chart.elements).reduce((a, b) => a + b, 0) || 1;
  const entries = Object.entries(chart.elements) as [Element, number][];
  const top = [...entries].sort((a, b) => b[1] - a[1])[0][0];
  return (
    <div className={s.overview}>
      <p className="eyebrow">Your constellation</p>
      <p className={s.overviewText}>
        The threads in the center are your aspects, drawn as light. The star at the heart leans toward your strongest element, <strong style={{ color: ELEMENT_COLORS[top] }}>{top}</strong>.
      </p>
      <div className={s.elements}>
        {entries.map(([el, n]) => (
          <div key={el} className={s.elRow}>
            <span className={s.elName}>{el}</span>
            <span className={s.elBar}>
              <span style={{ width: `${(n / total) * 100}%`, background: ELEMENT_COLORS[el] }} />
            </span>
            <span className="mono">{Math.round((n / total) * 100)}%</span>
          </div>
        ))}
      </div>
      <p className={s.hint}>Tap a planet to read it.</p>
    </div>
  );
}

function PlanetDetail({ chart, body, onClose }: { chart: Chart; body: BodyKey; onClose: () => void }) {
  const p = chart.placements.find((x) => x.body === body)!;
  const b = bodyByKey(body);
  const related = chart.aspects.filter((a) => a.a === body || a.b === body);
  return (
    <div className={s.detail}>
      <div className={s.detailHead}>
        <span className={`glyph ${s.detailOrb}`} style={{ background: `radial-gradient(circle, #fff 0%, ${b.color} 60%)` }}>
          {b.glyph}
        </span>
        <div>
          <p className="eyebrow">{b.name}</p>
          <p className={`display ${s.detailTitle}`}>
            in {SIGNS[p.sign].name} <span className="mono">{formatDegree(p.lon)}</span>
          </p>
        </div>
        <button className={s.close} onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
      <p>{placementLine(body, p.sign)}</p>
      {p.house && (
        <p className={s.muted}>
          House {p.house}: {HOUSE_REALM[p.house - 1]}
        </p>
      )}
      {p.retrograde && <p className={s.muted}>Retrograde: this energy turns inward before it shows.</p>}
      {related.length > 0 && (
        <ul className={s.detailAspects}>
          {related.map((a) => {
            const other = a.a === body ? a.b : a.a;
            return (
              <li key={`${a.a}-${a.b}`}>
                <span className="glyph" style={{ color: a.def.color }}>
                  {a.def.glyph}
                </span>{' '}
                {a.def.kind} {pointName(other)} <span className="mono">{a.orb.toFixed(1)}°</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
