'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Glyph } from '@/components/Glyph';
import { useChart } from '@/components/useChart';
import { houseOf, moonPhase, positionsAt, trueNode } from '@/lib/astro/chart';
import { BODIES, bodyByKey } from '@/lib/astro/constants';
import { ordinal, pointName } from '@/lib/astro/interpretations';
import { TRANSIT_FAST } from '@/lib/astro/interpretations/transitsFast';
import { TRANSIT_SLOW } from '@/lib/astro/interpretations/transitsSlow';
import { localToUtc } from '@/lib/astro/time';
import { DURATION, transitsAt, type Transit } from '@/lib/astro/transits';
import { ephemerisMonth } from '@/lib/astro/timing';
import { Blank, Field, PersonBar, PointMark, ResultHead, SignMark, partStyles as p, dateLabel, degLabel, isoDate, shortDate, signName, signOfLon, timeLabel, useParam, usePerson } from '../_tool/parts';

type Table = Record<string, Record<string, Record<'blend' | 'ease' | 'tension', string>>>;
const TEXT: Table = { ...(TRANSIT_FAST as Table), ...(TRANSIT_SLOW as Table) };
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function TransitsTool() {
  const { profile, isExample, choose } = usePerson();
  const natal = useChart(profile);
  const [dateParam, setDate] = useParam('date');
  const [timeParam, setTime] = useParam('time');
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);
  const tz = profile?.city.timeZone ?? 'UTC';
  const date = dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam) ? dateParam : today ? isoDate(today, tz) : null;
  const time = timeParam && /^\d{2}:\d{2}$/.test(timeParam) ? timeParam : '12:00';
  const moment = useMemo(() => (date ? localToUtc(date, time, tz) : null), [date, time, tz]);
  const [y, m] = date ? date.split('-').map(Number) : [2026, 1];
  const eph = useMemo(() => (date ? ephemerisMonth(y, m, trueNode) : null), [date, y, m]);
  const transits = useMemo(() => (natal && moment ? transitsAt(natal, moment) : []), [natal, moment]);
  if (!profile || !moment || !eph || !date) return <Blank />;

  const sky = positionsAt(moment);
  const node = trueNode(moment);
  const phase = moonPhase(moment);
  const text = (t: Transit) => TEXT[t.transit]?.[t.natal]?.[t.def.tone] ?? '';
  const stepMonth = (d: number) => {
    const dt = new Date(Date.UTC(y, m - 1 + d, 1));
    setDate(`${String(dt.getUTCFullYear()).padStart(4, '0')}-${String(dt.getUTCMonth() + 1).padStart(2, '0')}-01`);
  };

  return (
    <>
      <PersonBar profile={profile} isExample={isExample} choose={choose} label="Whose transits?" />
      <div className={p.controls}>
        <Field label="Date" htmlFor="tr-date">
          <input id="tr-date" className="input" type="date" value={date} onChange={(e) => setDate(e.target.value || null)} />
        </Field>
        <Field label={`Time in ${profile.city.name}`} htmlFor="tr-time">
          <input id="tr-time" className="input" type="time" value={time} onChange={(e) => setTime(e.target.value || null)} />
        </Field>
        {(dateParam || timeParam) && (
          <button
            type="button"
            className="nm-btn nm-btn-outline"
            onClick={() => {
              setDate(null);
              setTime(null);
            }}
          >
            Today
          </button>
        )}
      </div>

      <ResultHead kicker={`${dateLabel(moment, tz)}, ${time}`} title={transits.length ? `${transits.length} transits to ${profile.name.split(' ')[0]}’s chart` : 'A calm sky for your chart'}>
        <p>
          The Moon is {phase.name.toLowerCase()} in {signName(signOfLon(sky.find((x) => x.body === 'moon')!.lon))}, {Math.round(phase.illumination * 100)}% lit.
        </p>
      </ResultHead>

      {transits.length > 0 && (
        <ul className={p.list}>
          {transits.slice(0, 14).map((t, i) => {
            const lon = sky.find((x) => x.body === t.transit)!.lon;
            return (
              <li key={i}>
                <span className={p.listDate}>
                  <span className={p.cellRow}>
                    <PointMark k={t.transit} size={26} /> <Glyph name={t.def.kind} size={14} color={t.def.color} weight={2} /> <PointMark k={t.natal} size={26} />
                  </span>
                </span>
                <div className={p.listMain}>
                  <p>
                    {bodyByKey(t.transit).name} {t.def.kind} your {pointName(t.natal)}
                  </p>
                  <p className={p.listMeta}>
                    Orb {degLabel(t.orb)}, {t.applying ? 'getting closer' : 'moving apart'}. Lasts {DURATION[t.transit]}.{natal?.houses ? ` In your ${ordinal(houseOf(lon, natal.houses))} house.` : ''}
                  </p>
                  <p style={{ margin: '6px 0 0', fontSize: 18 }}>{text(t)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className={p.block}>
        <ResultHead kicker="The sky" title="Where the planets are" />
        <div className={p.scroll}>
          <table className={p.table}>
            <thead>
              <tr>
                <th>Planet</th>
                <th>Sign</th>
                <th>Degree</th>
                <th>Motion</th>
                {natal?.houses && <th>Your house</th>}
              </tr>
            </thead>
            <tbody>
              {sky.map((x) => (
                <tr key={x.body}>
                  <td>
                    <span className={p.cellRow}>
                      <PointMark k={x.body} size={24} /> {bodyByKey(x.body).name}
                    </span>
                  </td>
                  <td>
                    <span className={p.cellRow}>
                      <SignMark sign={signOfLon(x.lon)} size={16} /> {signName(signOfLon(x.lon))}
                    </span>
                  </td>
                  <td>{degLabel(x.lon)}</td>
                  <td>{x.retrograde ? 'Retrograde' : 'Direct'}</td>
                  {natal?.houses && <td>{ordinal(houseOf(x.lon, natal.houses))}</td>}
                </tr>
              ))}
              <tr>
                <td>
                  <span className={p.cellRow}>
                    <PointMark k="nnode" size={24} /> North Node
                  </span>
                </td>
                <td>
                  <span className={p.cellRow}>
                    <SignMark sign={signOfLon(node)} size={16} /> {signName(signOfLon(node))}
                  </span>
                </td>
                <td>{degLabel(node)}</td>
                <td>True node</td>
                {natal?.houses && <td>{ordinal(houseOf(node, natal.houses))}</td>}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={p.block}>
        <ResultHead kicker="Ephemeris" title={`${MONTHS[m - 1]} ${y}`}>
          <p>Every planet at 00:00 UTC each day. R marks a planet moving retrograde.</p>
        </ResultHead>
        <div className={p.actions}>
          <button type="button" className="nm-btn nm-btn-outline" onClick={() => stepMonth(-1)}>
            Previous month
          </button>
          <button type="button" className="nm-btn nm-btn-outline" onClick={() => stepMonth(1)}>
            Next month
          </button>
        </div>
        {eph.events.length > 0 && (
          <ul className={p.list}>
            {eph.events.map((e, i) => (
              <li key={i}>
                <span className={p.listDate}>
                  {shortDate(e.date)}, {timeLabel(e.date)} UTC
                </span>
                <div className={p.listMain}>
                  <span className={p.cellRow}>
                    {e.body && <PointMark k={e.body} size={24} />} {e.text}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className={p.scroll}>
          <table className={`${p.table} ${p.eph}`}>
            <thead>
              <tr>
                <th>Day</th>
                {BODIES.map((b) => (
                  <th key={b.key} title={b.name}>
                    <PointMark k={b.key} size={20} />
                  </th>
                ))}
                <th title="North Node">
                  <PointMark k="nnode" size={20} />
                </th>
              </tr>
            </thead>
            <tbody>
              {eph.days.map((d) => (
                <tr key={d.date.getTime()} data-current={isoDate(d.date) === date}>
                  <td>{d.date.getUTCDate()}</td>
                  {d.positions.map((x) => (
                    <td key={x.body}>
                      <span className={p.cellRow}>
                        {degLabel(x.lon)} <SignMark sign={signOfLon(x.lon)} size={13} />
                        {x.retrograde && <span className={p.retro}>R</span>}
                      </span>
                    </td>
                  ))}
                  <td>
                    <span className={p.cellRow}>
                      {degLabel(d.node)} <SignMark sign={signOfLon(d.node)} size={13} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={p.actions}>
        <Link href="/today" className="nm-btn nm-btn-primary">
          Your daily horoscope
        </Link>
        <Link href="/tools/retrogrades" className="nm-btn nm-btn-outline">
          Retrograde checker
        </Link>
      </div>
    </>
  );
}
