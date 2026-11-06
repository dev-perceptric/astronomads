'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ChartWheel from '@/components/ChartWheel';
import { useChart, useProfileFromUrl } from '@/components/useChart';
import { findAspect, formatDegree, type Chart, type PointKey } from '@/lib/astro/chart';
import { ELEMENT_COLORS, SIGNS, bodyByKey, type BodyKey, type Element, type Mode } from '@/lib/astro/constants';
import { HOUSE_REALM, natalAspectLine, placementLine } from '@/lib/astro/readings';
import { utcOffsetLabel } from '@/lib/astro/time';
import { saveProfile, type BirthProfile } from '@/lib/profile';
import s from './chart.module.css';

const pointName = (k: PointKey) => (k === 'asc' ? 'Ascendant' : k === 'mc' ? 'Midheaven' : bodyByKey(k).name);
const pointGlyph = (k: PointKey) => (k === 'asc' ? 'AC' : k === 'mc' ? 'MC' : bodyByKey(k).glyph);
const pointColor = (k: PointKey) => (k === 'asc' || k === 'mc' ? 'var(--ink)' : bodyByKey(k).color);

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
  const ascSign = chart.asc !== null ? Math.floor(chart.asc / 30) : null;

  return (
    <div className={s.layout}>
      {state.isExample && (
        <div className={s.banner}>
          <span>This is an example chart.</span>
          <Link className="btn btn-primary" href="/">
            Calculate yours
          </Link>
        </div>
      )}

      <header className={s.head}>
        <div className={s.headText}>
          <p className="eyebrow">Birth chart</p>
          <h1 className={`display ${s.name}`}>{profile.name}</h1>
          <p className={s.birth}>{birthLine(profile, chart)}</p>
        </div>
        <dl className={s.bigThree}>
          <BigOne label="Sun" sign={sun.sign} />
          <BigOne label="Moon" sign={moon.sign} />
          {ascSign !== null ? (
            <BigOne label="Ascendant" sign={ascSign} />
          ) : (
            <div className={s.big}>
              <dt className="eyebrow">Ascendant</dt>
              <dd className={s.bigNone}>Needs birth time</dd>
            </div>
          )}
        </dl>
      </header>

      <div className={s.top}>
        <section className={`card ${s.wheelCard}`} aria-label="Chart wheel">
          <ChartWheel chart={chart} name={profile.name} selected={selected} onSelect={setSelected} />
          <Legend />
        </section>

        <section className="card" aria-labelledby="positions">
          <div className="card-head">
            <h2 id="positions" className="card-title">
              Planet positions
            </h2>
            {!chart.timeKnown && <span className={s.note}>Noon chart, houses hidden</span>}
          </div>
          <div className="table-scroll">
            <table className={`table ${s.positions}`}>
              <thead>
                <tr>
                  <th>Planet</th>
                  <th>Sign</th>
                  <th>Position</th>
                  {chart.timeKnown && <th>House</th>}
                </tr>
              </thead>
              <tbody>
                {chart.placements.map((p) => {
                  const b = bodyByKey(p.body);
                  const sg = SIGNS[p.sign];
                  return (
                    <tr key={p.body} className={selected === p.body ? s.rowOn : undefined} onClick={() => setSelected(selected === p.body ? null : p.body)}>
                      <td>
                        <span className={s.cellGlyph} style={{ color: b.color }}>
                          <span className="glyph">{b.glyph}</span>
                        </span>
                        {b.name}
                      </td>
                      <td>
                        <span className={s.cellGlyph} style={{ color: ELEMENT_COLORS[sg.element] }}>
                          <span className="glyph">{sg.glyph}</span>
                        </span>
                        {sg.name}
                      </td>
                      <td className="mono">
                        {formatDegree(p.lon)}
                        {p.retrograde && <span className={s.retro}> ℞</span>}
                      </td>
                      {chart.timeKnown && <td className="mono">{p.house}</td>}
                    </tr>
                  );
                })}
                {chart.asc !== null && chart.mc !== null && (
                  <>
                    <AngleRow label="Ascendant" lon={chart.asc} house="1" />
                    <AngleRow label="Midheaven" lon={chart.mc} house="10" />
                  </>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className={s.grid2}>
        <section className="card" aria-labelledby="balance">
          <div className="card-head">
            <h2 id="balance" className="card-title">
              Elements and modes
            </h2>
          </div>
          <Balance chart={chart} />
        </section>
        <section className="card" aria-labelledby="grid">
          <div className="card-head">
            <h2 id="grid" className="card-title">
              Aspect grid
            </h2>
          </div>
          <AspectGrid chart={chart} />
        </section>
      </div>

      <section className={s.section} aria-labelledby="reading">
        <h2 id="reading" className={`display ${s.h2}`}>
          Your planets
        </h2>
        <div className={s.readings}>
          {chart.placements.map((p) => {
            const b = bodyByKey(p.body);
            const sg = SIGNS[p.sign];
            return (
              <article key={p.body} className={`card ${s.reading} ${selected === p.body ? s.readingOn : ''}`}>
                <h3 className={s.readingTitle}>
                  <span className="glyph" style={{ color: b.color }}>
                    {b.glyph}
                  </span>{' '}
                  {b.name} in {sg.name}
                  {p.retrograde && <span className={s.retroTag}>Retrograde</span>}
                </h3>
                <p className={s.readingMeta}>
                  <span className="mono">{formatDegree(p.lon)}</span> {sg.name}
                  {p.house && (
                    <>
                      {' '}
                      · House {p.house}, {HOUSE_REALM[p.house - 1]}
                    </>
                  )}
                </p>
                <p className={s.readingText}>{placementLine(p.body, p.sign)}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="card" aria-labelledby="aspects">
        <div className="card-head">
          <h2 id="aspects" className="card-title">
            Aspects
          </h2>
          <span className={s.note}>Tightest first</span>
        </div>
        {chart.aspects.length === 0 ? (
          <p className={s.empty}>No close aspects.</p>
        ) : (
          <div className="table-scroll">
            <table className="table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Orb</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                {chart.aspects.map((a) => (
                  <tr key={`${a.a}-${a.b}`}>
                    <td className={s.aspectCell}>
                      <span className={a.a === 'asc' || a.a === 'mc' ? s.angleTag : 'glyph'} style={{ color: pointColor(a.a) }}>
                        {pointGlyph(a.a)}
                      </span>{' '}
                      <span className="glyph" style={{ color: a.def.color }}>
                        {a.def.glyph}
                      </span>{' '}
                      <span className={a.b === 'asc' || a.b === 'mc' ? s.angleTag : 'glyph'} style={{ color: pointColor(a.b) }}>
                        {pointGlyph(a.b)}
                      </span>
                      <span className={s.aspectName}>
                        {pointName(a.a)} {a.def.kind} {pointName(a.b)}
                      </span>
                    </td>
                    <td className="mono">{a.orb.toFixed(1)}°</td>
                    <td className={s.meaning}>{natalAspectLine(a.a, a.def.kind, a.b)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {!state.isExample && !state.isSaved && (
        <div className={s.saveRow}>
          <button className="btn btn-primary" onClick={() => setSaved(saveProfile(profile) ? 'saved' : 'failed')} disabled={saved === 'saved'}>
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
  const date = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const time = p.time ? `at ${p.time} (${utcOffsetLabel(chart.utc, p.city.timeZone)})` : 'time unknown';
  return `Born ${date}, ${time}, in ${[p.city.name, p.city.region !== p.city.name ? p.city.region : '', p.city.country].filter(Boolean).join(', ')}`;
}

function BigOne({ label, sign }: { label: string; sign: number }) {
  const sg = SIGNS[sign];
  return (
    <div className={s.big}>
      <dt className="eyebrow">{label}</dt>
      <dd className={s.bigSign}>
        <span className="glyph" style={{ color: ELEMENT_COLORS[sg.element] }}>
          {sg.glyph}
        </span>{' '}
        {sg.name}
      </dd>
    </div>
  );
}

function AngleRow({ label, lon, house }: { label: string; lon: number; house: string }) {
  const sg = SIGNS[Math.floor(lon / 30)];
  return (
    <tr className={s.angleRow}>
      <td>
        <span className={s.cellGlyph}>{label === 'Ascendant' ? 'AC' : 'MC'}</span>
        {label}
      </td>
      <td>
        <span className={s.cellGlyph} style={{ color: ELEMENT_COLORS[sg.element] }}>
          <span className="glyph">{sg.glyph}</span>
        </span>
        {sg.name}
      </td>
      <td className="mono">{formatDegree(lon)}</td>
      <td className="mono">{house}</td>
    </tr>
  );
}

function Legend() {
  return (
    <ul className={s.legend}>
      <li>
        <span className={s.swatch} style={{ background: '#2a6cc9' }} /> Trine
      </li>
      <li>
        <span className={`${s.swatch} ${s.dashed}`} style={{ borderColor: '#2f9a6a' }} /> Sextile
      </li>
      <li>
        <span className={s.swatch} style={{ background: '#d2452f' }} /> Square, opposition
      </li>
    </ul>
  );
}

function Balance({ chart }: { chart: Chart }) {
  const modes: Record<Mode, number> = { cardinal: 0, fixed: 0, mutable: 0 };
  for (const p of chart.placements) modes[SIGNS[p.sign].mode] += p.body === 'sun' || p.body === 'moon' ? 2 : 1;
  if (chart.asc !== null) modes[SIGNS[Math.floor(chart.asc / 30)].mode] += 2;
  const total = Object.values(chart.elements).reduce((a, b) => a + b, 0) || 1;
  const els = Object.entries(chart.elements) as [Element, number][];
  const mds = Object.entries(modes) as [Mode, number][];
  const topEl = [...els].sort((a, b) => b[1] - a[1])[0][0];
  const topMd = [...mds].sort((a, b) => b[1] - a[1])[0][0];
  const row = (name: string, n: number, color: string, top: boolean) => (
    <div key={name} className={s.balRow}>
      <span className={`${s.balName} ${top ? s.balTop : ''}`}>{name}</span>
      <span className={s.balBar}>
        <span style={{ width: `${(n / total) * 100}%`, background: color }} />
      </span>
      <span className="mono">{Math.round((n / total) * 100)}%</span>
    </div>
  );
  return (
    <div className={s.balance}>
      <div className={s.balGroup}>
        <p className="eyebrow">Elements</p>
        {els.map(([el, n]) => row(el, n, ELEMENT_COLORS[el], el === topEl))}
      </div>
      <div className={s.balGroup}>
        <p className="eyebrow">Modes</p>
        {mds.map(([m, n]) => row(m, n, 'var(--accent)', m === topMd))}
      </div>
      <p className={s.balSummary}>
        Strongest: <strong>{topEl}</strong> and <strong>{topMd}</strong>. Sun and Moon count double{chart.asc !== null ? ', and so does the Ascendant' : ''}.
      </p>
    </div>
  );
}

function AspectGrid({ chart }: { chart: Chart }) {
  const points: { key: PointKey; lon: number }[] = chart.placements.map((p) => ({ key: p.body, lon: p.lon }));
  if (chart.asc !== null && chart.mc !== null) points.push({ key: 'asc', lon: chart.asc }, { key: 'mc', lon: chart.mc });
  return (
    <div className="table-scroll">
      <table className={s.grid} aria-label="Aspects between every pair of planets">
        <tbody>
          {points.map((row, i) => (
            <tr key={row.key}>
              {points.slice(0, i).map((col) => {
                const hit = row.key === 'mc' && col.key === 'asc' ? null : findAspect(row.lon, col.lon);
                return (
                  <td key={col.key} title={hit ? `${pointName(row.key)} ${hit.def.kind} ${pointName(col.key)}, orb ${hit.orb.toFixed(1)}°` : undefined}>
                    {hit && (
                      <>
                        <span className="glyph" style={{ color: hit.def.color }}>
                          {hit.def.glyph}
                        </span>
                        <span className={s.gridOrb}>{hit.orb.toFixed(0)}°</span>
                      </>
                    )}
                  </td>
                );
              })}
              <th scope="row" style={{ color: pointColor(row.key) }}>
                {row.key === 'asc' || row.key === 'mc' ? pointGlyph(row.key) : <span className="glyph">{pointGlyph(row.key)}</span>}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
