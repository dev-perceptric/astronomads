'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ChartWheel from '@/components/ChartWheel';
import { Glyph, type GlyphName, type SignKey } from '@/components/Glyph';
import { Glyph3D } from '@/components/Glyph3D';
import Stipple from '@/components/Stipple';
import { useChart, useProfileFromUrl } from '@/components/useChart';
import { findAspect, formatDegree, type Chart, type PointKey } from '@/lib/astro/chart';
import { ELEMENT_COLORS, SIGNS, bodyByKey, type BodyKey, type Element, type Mode } from '@/lib/astro/constants';
import { HOUSE_REALM, natalAspectLine, placementLine } from '@/lib/astro/readings';
import { utcOffsetLabel } from '@/lib/astro/time';
import { saveProfile, type BirthProfile } from '@/lib/profile';
import s from './chart.module.css';

const pointName = (k: PointKey) => (k === 'asc' ? 'Ascendant' : k === 'mc' ? 'Midheaven' : bodyByKey(k).name);
const pointColor = (k: PointKey) => (k === 'asc' || k === 'mc' ? 'currentColor' : bodyByKey(k).color);
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

export default function ChartView() {
  const params = useSearchParams();
  const state = useProfileFromUrl(new URLSearchParams(params.toString()));
  const profile = state && 'profile' in state ? state.profile : null;
  const chart = useChart(profile);
  const [selected, setSelected] = useState<BodyKey | null>(null);
  const [saved, setSaved] = useState<'idle' | 'saved' | 'failed'>('idle');

  if (!state) return <section className={`nm-section nm-void ${s.blank}`} />;
  if ('error' in state || !profile || !chart) {
    return (
      <section className={`nm-section nm-void ${s.blank}`}>
        <p className="nm-label">Birth chart</p>
        <p className={s.errorText}>{'error' in state ? state.error : 'This birth date or time can’t be read. Check it and draw the chart again.'}</p>
        <Link href="/#start" className="nm-btn nm-btn-primary">
          Start over
        </Link>
      </section>
    );
  }

  const sun = chart.placements.find((p) => p.body === 'sun')!;
  const moon = chart.placements.find((p) => p.body === 'moon')!;
  const select = (b: BodyKey) => setSelected(selected === b ? null : b);
  const canSave = !state.isExample && !state.isSaved && saved !== 'saved';

  return (
    <>
      {/* Hero */}
      <section className={`nm-section nm-void ${s.hero}`}>
        <Stipple kind="field" tone="astral" className={s.heroField} />
        <Stipple kind="planet" className={s.heroPlanet} />
        <div className={`nm-bracket ${s.heroFrame}`}>
          <div className={s.heroTop}>
            <p className="nm-label">Birth chart</p>
            <div className={s.heroActions}>
              {state.isExample && <span className={s.examplePill}>Example chart</span>}
              {canSave && (
                <button className="nm-btn nm-btn-primary" onClick={() => setSaved(saveProfile(profile) ? 'saved' : 'failed')}>
                  Save as my chart
                </button>
              )}
              {saved === 'saved' && <span className={s.examplePill}>Saved as my chart</span>}
              <Link href="/#start" className={`nm-btn ${state.isExample ? 'nm-btn-primary' : 'nm-btn-glass'}`}>
                {state.isExample ? 'Calculate yours' : 'New chart'}
              </Link>
            </div>
          </div>
          {saved === 'failed' && <p className={s.errorText}>This browser blocked saving. Allow site data and try again.</p>}
          <h1 className={`${s.name} fade-up`}>{profile.name}</h1>
          <p className={s.birth}>{birthLine(profile, chart)}</p>

          <dl className={s.triptych}>
            <BigOne label="Sun" sign={sun.sign} lon={sun.lon} house={sun.house} />
            <BigOne label="Moon" sign={moon.sign} lon={moon.lon} house={moon.house} />
            {chart.asc !== null ? (
              <BigOne label="Ascendant" sign={Math.floor(chart.asc / 30)} lon={chart.asc} house={1} />
            ) : (
              <div className={s.big}>
                <dt className="nm-label">Ascendant</dt>
                <dd className={s.bigEmpty}>Needs your birth time</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      {/* Wheel and ledger */}
      <section className={`nm-section nm-void ${s.wheelSection}`}>
        <p className="nm-label">01 The wheel</p>
        <h2 className="nm-title">Your sky at the minute you arrived</h2>
        <div className={s.wheelGrid}>
          <div className={s.wheelCol}>
            <ChartWheel chart={chart} name={profile.name} selected={selected} onSelect={setSelected} />
          </div>
          <div className={s.ledgerCol}>
            <div className={s.ledgerHead}>
              <span>Positions</span>
              <span>{chart.timeKnown ? (chart.houseSystem === 'placidus' ? 'Placidus houses' : 'Whole sign houses') : 'Noon chart, no houses'}</span>
            </div>
            <ul className={s.ledger}>
              {chart.placements.map((p) => {
                const b = bodyByKey(p.body);
                const sg = SIGNS[p.sign];
                return (
                  <li key={p.body}>
                    <button className={s.ledgerRow} onClick={() => select(p.body)} aria-pressed={selected === p.body}>
                      <Glyph3D name={p.body} size={30} color={b.color} ground="dark" depth={3} />
                      <span className={s.ledgerName}>{b.name}</span>
                      <span className={s.ledgerSign}>
                        <Glyph name={sg.key as SignKey} size={16} color={ELEMENT_COLORS[sg.element]} weight={1.8} />
                        {sg.name}
                      </span>
                      <span className={s.ledgerDeg}>
                        {formatDegree(p.lon)}
                        {p.retrograde && <span className={s.retro}>R</span>}
                      </span>
                      <span className={s.ledgerHouse}>{p.house ? ROMAN[p.house - 1] : ''}</span>
                    </button>
                  </li>
                );
              })}
              {chart.asc !== null && chart.mc !== null && (
                <>
                  <AngleRow label="Ascendant" glyph="asc" lon={chart.asc} house="I" />
                  <AngleRow label="Midheaven" glyph="mc" lon={chart.mc} house="X" />
                </>
              )}
            </ul>
            <ul className={s.legend}>
              <li>
                <span className={s.swatch} style={{ background: 'var(--asp-ease)' }} /> Trine
              </li>
              <li>
                <span className={`${s.swatch} ${s.dashed}`} style={{ borderColor: 'var(--asp-soft)' }} /> Sextile
              </li>
              <li>
                <span className={s.swatch} style={{ background: 'var(--asp-hard)' }} /> Square, opposition
              </li>
              <li>
                <span className={s.swatch} style={{ background: 'var(--asp-blend)' }} /> Conjunction
              </li>
            </ul>
            {selected && <Focus chart={chart} body={selected} onClose={() => setSelected(null)} />}
          </div>
        </div>
      </section>

      {/* Planets */}
      <section className="nm-section nm-marble">
        <p className="nm-label">02 Your planets</p>
        <h2 className="nm-title">What each planet says about you</h2>
        <div className={s.planetGrid}>
          {chart.placements.map((p) => {
            const b = bodyByKey(p.body);
            const sg = SIGNS[p.sign];
            return (
              <button key={p.body} className={`nm-bracket ${s.planetCard} ${selected === p.body ? s.planetOn : ''}`} onClick={() => select(p.body)}>
                <span className={s.planetGlyph}>
                  <Glyph3D name={p.body} size={72} color={b.color} ground="light" />
                </span>
                <span className={s.planetTitle}>
                  {b.name} in {sg.name}
                </span>
                <span className={s.planetMeta}>
                  {formatDegree(p.lon)} {sg.name}
                  {p.house ? ` · House ${ROMAN[p.house - 1]}, ${HOUSE_REALM[p.house - 1]}` : ''}
                  {p.retrograde ? ' · Retrograde' : ''}
                </span>
                <span className={s.planetText}>{placementLine(p.body, p.sign)}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Balance */}
      <Balance chart={chart} />

      {/* Aspects */}
      <section className="nm-section nm-marble">
        <p className="nm-label">04 Aspects</p>
        <h2 className="nm-title">How your planets speak to each other</h2>
        <div className={s.aspectGrid}>
          <AspectTable chart={chart} />
          <ul className={s.aspectList}>
            {chart.aspects.length === 0 && <li className={s.planetMeta}>No close aspects.</li>}
            {chart.aspects.map((a) => (
              <li key={`${a.a}-${a.b}`} className={s.aspectRow}>
                <span className={s.trio}>
                  <Glyph name={a.a as GlyphName} size={20} color={pointColor(a.a)} weight={1.9} />
                  <Glyph name={a.def.kind} size={15} color={a.def.color} weight={1.9} />
                  <Glyph name={a.b as GlyphName} size={20} color={pointColor(a.b)} weight={1.9} />
                </span>
                <span className={s.aspectMain}>
                  <span className={s.aspectName}>
                    {pointName(a.a)} {a.def.kind} {pointName(a.b)}
                  </span>
                  <span className={s.aspectText}>{natalAspectLine(a.a, a.def.kind, a.b)}</span>
                </span>
                <span className={s.orb}>{a.orb.toFixed(1)}°</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function birthLine(p: BirthProfile, chart: Chart) {
  const [y, m, d] = p.date.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const time = p.time ? `${p.time} (${utcOffsetLabel(chart.utc, p.city.timeZone)})` : 'time unknown';
  const place = [p.city.name, p.city.region !== p.city.name ? p.city.region : '', p.city.country].filter(Boolean).join(', ');
  return `${date} · ${time} · ${place}`;
}

function BigOne({ label, sign, lon, house }: { label: string; sign: number; lon: number; house: number | null }) {
  const sg = SIGNS[sign];
  return (
    <div className={s.big}>
      <dt className="nm-label">{label}</dt>
      <dd className={s.bigBody}>
        <Glyph name={sg.key as SignKey} size={64} color={ELEMENT_COLORS[sg.element]} weight={1.7} />
        <span className={s.bigSign}>{sg.name}</span>
        <span className={s.bigMeta}>
          {formatDegree(lon)}
          {house ? ` · House ${ROMAN[house - 1]}` : ''}
        </span>
      </dd>
    </div>
  );
}

function AngleRow({ label, glyph, lon, house }: { label: string; glyph: 'asc' | 'mc'; lon: number; house: string }) {
  const sg = SIGNS[Math.floor(lon / 30)];
  return (
    <li>
      <div className={`${s.ledgerRow} ${s.ledgerAngle}`}>
        <Glyph name={glyph} size={20} color="currentColor" weight={1.9} />
        <span className={s.ledgerName}>{label}</span>
        <span className={s.ledgerSign}>
          <Glyph name={sg.key as SignKey} size={16} color={ELEMENT_COLORS[sg.element]} weight={1.8} />
          {sg.name}
        </span>
        <span className={s.ledgerDeg}>{formatDegree(lon)}</span>
        <span className={s.ledgerHouse}>{house}</span>
      </div>
    </li>
  );
}

function Focus({ chart, body, onClose }: { chart: Chart; body: BodyKey; onClose: () => void }) {
  const p = chart.placements.find((x) => x.body === body)!;
  const b = bodyByKey(body);
  const related = chart.aspects.filter((a) => a.a === body || a.b === body);
  return (
    <div className={`nm-bracket ${s.focus}`}>
      <div className={s.focusHead}>
        <Glyph3D name={body} size={52} color={b.color} ground="dark" />
        <div>
          <p className={s.focusTitle}>
            {b.name} in {SIGNS[p.sign].name}
          </p>
          <p className={s.focusMeta}>
            {formatDegree(p.lon)}
            {p.house ? ` · House ${ROMAN[p.house - 1]}, ${HOUSE_REALM[p.house - 1]}` : ''}
          </p>
        </div>
        <button className={s.close} onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
      <p className={s.focusText}>{placementLine(body, p.sign)}</p>
      {related.length > 0 && (
        <ul className={s.focusAspects}>
          {related.map((a) => {
            const other = a.a === body ? a.b : a.a;
            return (
              <li key={`${a.a}-${a.b}`}>
                <Glyph name={a.def.kind} size={14} color={a.def.color} weight={1.9} /> {a.def.kind} {pointName(other)} <span className={s.orb}>{a.orb.toFixed(1)}°</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Balance({ chart }: { chart: Chart }) {
  const modes: Record<Mode, number> = { cardinal: 0, fixed: 0, mutable: 0 };
  for (const p of chart.placements) modes[SIGNS[p.sign].mode] += p.body === 'sun' || p.body === 'moon' ? 2 : 1;
  if (chart.asc !== null) modes[SIGNS[Math.floor(chart.asc / 30)].mode] += 2;
  const els = Object.entries(chart.elements) as [Element, number][];
  const mds = Object.entries(modes) as [Mode, number][];
  const total = els.reduce((a, [, n]) => a + n, 0) || 1;
  const topEl = [...els].sort((a, b) => b[1] - a[1])[0][0];
  const topMd = [...mds].sort((a, b) => b[1] - a[1])[0][0];
  const cap = (t: string) => t[0].toUpperCase() + t.slice(1);
  const row = (name: string, n: number, color: string) => (
    <div key={name} className={s.dotRow}>
      <span className={s.dotName}>{cap(name)}</span>
      <span className={s.dots} aria-label={`${n} of ${total}`}>
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={i < n ? s.dotOn : s.dotOff} style={i < n ? { background: color } : undefined} />
        ))}
      </span>
      <span className={s.dotPct}>{Math.round((n / total) * 100)}%</span>
    </div>
  );
  return (
    <section className="nm-section nm-void">
      <p className="nm-label">03 Balance</p>
      <h2 className="nm-title">
        Mostly {cap(topEl)} and {cap(topMd)}
      </h2>
      <div className={s.balanceGrid}>
        <div>
          <p className={s.groupLabel}>Elements</p>
          {els.map(([el, n]) => row(el, n, ELEMENT_COLORS[el]))}
        </div>
        <div>
          <p className={s.groupLabel}>Modes</p>
          {mds.map(([m, n]) => row(m, n, 'var(--marble)'))}
        </div>
      </div>
      <p className={s.balanceNote}>Each dot is one weight: planets count once, the Sun, Moon and Ascendant twice.</p>
    </section>
  );
}

function AspectTable({ chart }: { chart: Chart }) {
  const points: { key: PointKey; lon: number }[] = chart.placements.map((p) => ({ key: p.body, lon: p.lon }));
  if (chart.asc !== null && chart.mc !== null) points.push({ key: 'asc', lon: chart.asc }, { key: 'mc', lon: chart.mc });
  return (
    <div className={s.gridWrap}>
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
                        <Glyph name={hit.def.kind} size={15} color={hit.def.color} weight={2} className={s.gridGlyph} />
                        <span className={s.gridOrb}>{hit.orb.toFixed(0)}°</span>
                      </>
                    )}
                  </td>
                );
              })}
              <th scope="row">
                <Glyph name={row.key as GlyphName} size={18} color={pointColor(row.key)} weight={1.9} />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
