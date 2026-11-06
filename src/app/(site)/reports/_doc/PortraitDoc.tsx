'use client';

import ChartWheel from '@/components/ChartWheel';
import { Glyph, type SignKey } from '@/components/Glyph';
import { Glyph3D } from '@/components/Glyph3D';
import { useChart } from '@/components/useChart';
import { formatDegree, type PointKey } from '@/lib/astro/chart';
import { ELEMENT_COLORS, SIGNS, type BodyKey, type Element, type Mode, type NodeKey } from '@/lib/astro/constants';
import { ELEMENT_LOW, ELEMENT_STRONG, IN_HOUSE, IN_SIGN, MODE_STRONG, POINT_INFO, aspectReading, ordinal, pointColor, pointName, pointPosition, readingOrder } from '@/lib/astro/interpretations';
import type { BirthProfile } from '@/lib/profile';
import { SIGN_FACTS } from '@/lib/zodiac/signs';
import s from './doc.module.css';

const cap = (t: string) => t[0].toUpperCase() + t.slice(1);
const birthLine = (p: BirthProfile) => {
  const [y, m, d] = p.date.split('-').map(Number);
  const dt = new Date(Date.UTC(2000, m - 1, d));
  dt.setUTCFullYear(y);
  return `${dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })} · ${p.time ?? 'time unknown'} · ${p.city.name}, ${p.city.country}`;
};

/** The Birth Chart Portrait. `full` false shows the opening chapters and a teaser. */
export default function PortraitDoc({ profile, full }: { profile: BirthProfile; full: boolean }) {
  const chart = useChart(profile);
  if (!chart) return null;

  const order = readingOrder(chart);
  const els = Object.entries(chart.elements) as [Element, number][];
  const modes: Record<Mode, number> = { cardinal: 0, fixed: 0, mutable: 0 };
  for (const p of chart.placements) modes[SIGNS[p.sign].mode] += p.body === 'sun' || p.body === 'moon' ? 2 : 1;
  if (chart.asc !== null) modes[SIGNS[Math.floor(chart.asc / 30)].mode] += 2;
  const topEl = [...els].sort((a, b) => b[1] - a[1])[0][0];
  const lowEl = [...els].sort((a, b) => a[1] - b[1])[0];
  const topMode = (Object.entries(modes) as [Mode, number][]).sort((a, b) => b[1] - a[1])[0][0];
  const ascSign = chart.asc !== null ? Math.floor(chart.asc / 30) : null;
  const ruler = ascSign !== null ? (SIGN_FACTS[ascSign].ruler.toLowerCase() as BodyKey) : null;
  const rulerPos = ruler ? pointPosition(chart, ruler) : null;
  const big: PointKey[] = ['sun', 'moon', ...(chart.asc !== null ? (['asc'] as PointKey[]) : [])];

  return (
    <article className={s.doc}>
      <header className={s.cover}>
        <p className="nm-label">Birth Chart Portrait</p>
        <h1 className={s.coverName}>{profile.name}</h1>
        <p className={s.coverMeta}>{birthLine(profile)}</p>
        <div className={s.coverWheel}>
          <ChartWheel chart={chart} name={profile.name} ground="light" />
        </div>
      </header>

      <section className={s.chapter}>
        <p className={s.kicker}>Chapter 1</p>
        <h2 className={s.h2}>Your big three</h2>
        {big.map((k) => {
          const pos = pointPosition(chart, k)!;
          const sg = SIGNS[pos.sign];
          return (
            <div key={k} className={s.block}>
              <h3 className={s.h3}>
                <Glyph name={sg.key as SignKey} size={26} color={ELEMENT_COLORS[sg.element]} weight={1.8} /> {pointName(k)} in {sg.name}
              </h3>
              <p className={s.role}>{POINT_INFO[k].role}</p>
              <p className={s.p}>{IN_SIGN[k][pos.sign]}</p>
            </div>
          );
        })}
      </section>

      <section className={s.chapter}>
        <p className={s.kicker}>Chapter 2</p>
        <h2 className={s.h2}>Your balance</h2>
        <div className={s.balance}>
          {els.map(([e, n]) => (
            <span key={e} className={s.balItem}>
              <span className={s.balDot} style={{ background: ELEMENT_COLORS[e] }} />
              {cap(e)} {n}
            </span>
          ))}
        </div>
        <h3 className={s.h3}>Mostly {topEl}</h3>
        <p className={s.p}>{ELEMENT_STRONG[topEl]}</p>
        {lowEl[1] <= 2 && (
          <>
            <h3 className={s.h3}>Light on {lowEl[0]}</h3>
            <p className={s.p}>{ELEMENT_LOW[lowEl[0]]}</p>
          </>
        )}
        <h3 className={s.h3}>A {topMode} chart</h3>
        <p className={s.p}>{MODE_STRONG[topMode]}</p>
        {ruler && rulerPos && (
          <>
            <h3 className={s.h3}>Your chart ruler: {pointName(ruler)}</h3>
            <p className={s.p}>
              With {SIGNS[ascSign!].name} rising, {pointName(ruler)} rules your chart. It sits in {SIGNS[rulerPos.sign].name}
              {rulerPos.house ? `, in your ${ordinal(rulerPos.house)} house` : ''}, so its story colors everything else. {IN_SIGN[ruler][rulerPos.sign]}
            </p>
          </>
        )}
      </section>

      <section className={s.chapter}>
        <p className={s.kicker}>Chapter 3</p>
        <h2 className={s.h2}>Every point in your chart</h2>
        {(full ? order : order.slice(0, 1)).map((k) => (
          <PointChapter key={k} k={k} chart={chart} />
        ))}
      </section>

      {!full && (
        <div className={s.locked} aria-hidden="true">
          {order.slice(1, 5).map((k) => (
            <p key={k} className={s.lockedLine}>
              {pointName(k)} in {SIGNS[pointPosition(chart, k)!.sign].name}
            </p>
          ))}
        </div>
      )}

      {full && (
        <section className={s.chapter}>
          <p className={s.kicker}>Closing</p>
          <h2 className={s.h2}>Using your chart</h2>
          <p className={s.p}>
            A birth chart describes tendencies and gifts, and you decide what to do with them. Come back to a chapter when life touches that part of you: a new relationship, a career move, a hard season. Your daily horoscope on Astronomads follows the planets as they move across these same points.
          </p>
          <p className={s.small}>Calculated with Placidus houses and the true lunar node. Text written by Astronomads.</p>
        </section>
      )}
    </article>
  );
}

function PointChapter({ k, chart }: { k: PointKey; chart: NonNullable<ReturnType<typeof useChart>> }) {
  const pos = pointPosition(chart, k)!;
  const sg = SIGNS[pos.sign];
  const angle = k === 'asc' || k === 'mc';
  const related = chart.aspects.filter((a) => a.a === k || a.b === k);
  return (
    <div className={s.point}>
      <h3 className={s.pointHead}>
        {angle ? <span className={s.angleMark}>{k === 'asc' ? 'AC' : 'MC'}</span> : <Glyph3D name={k as BodyKey | NodeKey} size={44} color={pointColor(k)} ground="light" />}
        <span>
          <span className={s.pointTitle}>
            {pointName(k)} in {sg.name}
          </span>
          <span className={s.pointMeta}>
            {formatDegree(pos.lon)} {sg.name}
            {pos.house && !angle ? ` · ${ordinal(pos.house)} house` : ''}
            {pos.retrograde ? ' · retrograde' : ''}
          </span>
        </span>
      </h3>
      <p className={s.p}>{POINT_INFO[k].text}</p>
      <p className={s.p}>{IN_SIGN[k][pos.sign]}</p>
      {pos.house && !angle && <p className={s.p}>{IN_HOUSE[k as BodyKey | NodeKey][pos.house - 1]}</p>}
      {related.length > 0 && (
        <ul className={s.aspects}>
          {related.map((a) => {
            const other = a.a === k ? a.b : a.a;
            return (
              <li key={`${a.a}-${a.b}`}>
                <p className={s.aspectName}>
                  <Glyph name={a.def.kind} size={14} color={a.def.color} weight={2} /> {pointName(k)} {a.def.kind} {pointName(other)}
                </p>
                <p className={s.aspectText}>{aspectReading(a)}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
