'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useChart } from '@/components/useChart';
import { houseOf, positionsAt } from '@/lib/astro/chart';
import { bodyByKey } from '@/lib/astro/constants';
import { ordinal } from '@/lib/astro/interpretations';
import { RETRO, type RetroPlanet } from '@/lib/astro/interpretations/returns';
import { RETRO_BODIES, retrogrades, type Retrograde } from '@/lib/astro/timing';
import { Blank, Field, PersonBar, PointMark, Reading, Readings, ResultHead, SignMark, partStyles as p, degLabel, isoDate, shortDate, signName, signOfLon, useParam, usePerson } from '../_tool/parts';

const DAY = 86400e3;
const at = (r: Retrograde, d: Date) => r.start.date <= d && r.end.date > d;
const pos = (lon: number) => (
  <span className={p.cellRow}>
    <SignMark sign={signOfLon(lon)} size={16} /> {degLabel(lon)} {signName(signOfLon(lon))}
  </span>
);

export default function RetrogradesTool() {
  const [dateParam, setDate] = useParam('date');
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);
  const day = useMemo(() => {
    if (!today) return null;
    if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) return new Date(`${dateParam}T12:00:00Z`);
    return today;
  }, [dateParam, today]);
  const year = day?.getUTCFullYear() ?? 2026;
  const periods = useMemo(() => {
    if (!day) return null;
    const from = new Date(Date.UTC(year, 0, 1));
    const to = new Date(Date.UTC(year + 2, 0, 1));
    return Object.fromEntries(RETRO_BODIES.map((b) => [b, retrogrades(b, from, to)])) as Record<RetroPlanet, Retrograde[]>;
  }, [day, year]);
  const { profile, isExample, choose } = usePerson();
  const natal = useChart(profile);
  if (!day || !periods) return <Blank />;

  const sky = positionsAt(day);
  const retroNow = RETRO_BODIES.filter((b) => sky.find((x) => x.body === b)!.retrograde) as RetroPlanet[];
  const label = dateParam ? shortDate(day) : 'right now';
  const all = RETRO_BODIES.flatMap((b) => periods[b as RetroPlanet]).sort((a, b) => a.start.date.getTime() - b.start.date.getTime());

  return (
    <>
      <div className={p.controls}>
        <Field label="Check a date" htmlFor="retro-date">
          <input id="retro-date" className="input" type="date" value={dateParam ?? isoDate(today!)} onChange={(e) => setDate(e.target.value || null)} />
        </Field>
        {dateParam && (
          <button type="button" className="nm-btn nm-btn-outline" onClick={() => setDate(null)}>
            Back to today
          </button>
        )}
      </div>

      <ResultHead kicker={`Retrogrades ${label}`} title={retroNow.length === 0 ? `No planet is retrograde ${label}` : `${retroNow.length} ${retroNow.length === 1 ? 'planet is' : 'planets are'} retrograde ${label}`}>
        <p>{retroNow.length === 0 ? 'Every planet from Mercury to Pluto is moving forward. A clear stretch for launches and fresh starts.' : retroNow.map((b) => bodyByKey(b).name).join(', ').replace(/, ([^,]*)$/, ' and $1') + '.'}</p>
      </ResultHead>

      <div className={p.scroll}>
        <table className={p.table}>
          <thead>
            <tr>
              <th>Planet</th>
              <th>Position</th>
              <th>Motion</th>
              <th>Next station</th>
            </tr>
          </thead>
          <tbody>
            {RETRO_BODIES.map((b) => {
              const s = sky.find((x) => x.body === b)!;
              const list = periods[b as RetroPlanet];
              const current = list.find((r) => at(r, day));
              const next = current ? current.end : list.find((r) => r.start.date > day)?.start;
              return (
                <tr key={b} data-current={s.retrograde}>
                  <td>
                    <span className={p.cellRow}>
                      <PointMark k={b} size={26} /> {bodyByKey(b).name}
                    </span>
                  </td>
                  <td>{pos(s.lon)}</td>
                  <td>{s.retrograde ? <strong>Retrograde</strong> : 'Direct'}</td>
                  <td>{next ? `${next.kind === 'retrograde' ? 'Turns retrograde' : 'Turns direct'} ${shortDate(next.date)}` : 'After next year'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {retroNow.length > 0 && (
        <Readings>
          {retroNow.map((b) => {
            const r = periods[b].find((x) => at(x, day))!;
            return (
              <Reading key={b} kicker={`${shortDate(r.start.date)} to ${shortDate(r.end.date)}`} title={<><PointMark k={b} size={30} /> {bodyByKey(b).name} retrograde</>}>
                <p>{RETRO[b].now}</p>
                <ul>
                  {RETRO[b].tips.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Reading>
            );
          })}
        </Readings>
      )}

      <div className={p.block}>
        <ResultHead kicker="Calendar" title={`Every retrograde in ${year} and ${year + 1}`}>
          <p>The shadow is the stretch of sky a retrograde covers. The pre-shadow starts when the planet first reaches the degree where it will later turn direct, and the post-shadow ends when it passes the degree where it turned back. Dates are in UTC.</p>
        </ResultHead>
        <div className={p.scroll}>
          <table className={p.table}>
            <thead>
              <tr>
                <th>Planet</th>
                <th>Shadow starts</th>
                <th>Turns retrograde</th>
                <th>Turns direct</th>
                <th>Shadow ends</th>
                <th>Days</th>
              </tr>
            </thead>
            <tbody>
              {all.map((r) => (
                <tr key={`${r.body}${r.start.date.getTime()}`} data-current={at(r, day)}>
                  <td>
                    <span className={p.cellRow}>
                      <PointMark k={r.body} size={24} /> {bodyByKey(r.body).name}
                    </span>
                  </td>
                  <td>{r.preShadow ? shortDate(r.preShadow) : ''}</td>
                  <td>
                    {shortDate(r.start.date)}
                    <br />
                    {pos(r.start.lon)}
                  </td>
                  <td>
                    {shortDate(r.end.date)}
                    <br />
                    {pos(r.end.lon)}
                  </td>
                  <td>{r.postShadow ? shortDate(r.postShadow) : ''}</td>
                  <td>{Math.round((r.end.date.getTime() - r.start.date.getTime()) / DAY)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {profile && natal && (
        <div className={p.block}>
          <ResultHead kicker="Your chart" title="Retrogrades and you" />
          <PersonBar profile={profile} isExample={isExample} choose={choose} />
          <Readings>
            {natal.placements
              .filter((x) => x.retrograde)
              .map((x) => (
                <Reading key={x.body} kicker="Born retrograde" title={<><PointMark k={x.body} size={30} /> {bodyByKey(x.body).name} retrograde in {signName(x.sign)}</>}>
                  <p>{RETRO[x.body as RetroPlanet].natal}</p>
                </Reading>
              ))}
            {natal.placements.every((x) => !x.retrograde) && (
              <Reading kicker="Born retrograde" title="No retrograde planets at birth">
                <p>Every planet was moving forward when you were born. You tend to act on ideas in the open and learn by doing.</p>
              </Reading>
            )}
            {natal.houses &&
              retroNow.map((b) => {
                const lon = sky.find((x) => x.body === b)!.lon;
                return (
                  <Reading key={`h${b}`} kicker={`Now, ${label}`} title={<><PointMark k={b} size={30} /> {bodyByKey(b).name} retrograde in your {ordinal(houseOf(lon, natal.houses!))} house</>}>
                    <p>This is the part of your life where {bodyByKey(b).name}’s review is happening for you. Expect to revisit plans and people tied to your {ordinal(houseOf(lon, natal.houses!))} house before moving ahead.</p>
                  </Reading>
                );
              })}
          </Readings>
        </div>
      )}

      <div className={p.block}>
        <ResultHead kicker="Each planet" title="What each retrograde is about" />
        <Readings>
          {(RETRO_BODIES as RetroPlanet[]).map((b) => (
            <Reading key={b} title={<><PointMark k={b} size={30} /> {bodyByKey(b).name}</>}>
              <p>{RETRO[b].about}</p>
            </Reading>
          ))}
        </Readings>
      </div>

      <div className={p.actions}>
        <Link href="/today" className="nm-btn nm-btn-primary">
          Your daily horoscope
        </Link>
        <Link href="/tools/transits" className="nm-btn nm-btn-outline">
          Transits for any date
        </Link>
      </div>
    </>
  );
}
