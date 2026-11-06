'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useChart } from '@/components/useChart';
import { houseOf } from '@/lib/astro/chart';
import { bodyByKey, type BodyKey } from '@/lib/astro/constants';
import { IN_SIGN, ordinal } from '@/lib/astro/interpretations';
import { PROG_MOON_PHASE, PROG_MOON_SIGN, PROG_SUN_SIGN } from '@/lib/astro/interpretations/cycles';
import { PHASES, YEAR_DAYS, progressedTimeline, progressions } from '@/lib/astro/timing';
import { Blank, Field, Note, PersonBar, PointMark, Reading, Readings, ResultHead, SignMark, SignTile, Tiles, partStyles as p, dateLabel, degLabel, isoDate, shortDate, signName, signOfLon, useParam, usePerson } from '../_tool/parts';

const DAY = 86400e3;
const SHOWN: BodyKey[] = ['sun', 'moon', 'mercury', 'venus', 'mars'];

export default function ProgressionsTool() {
  const { profile, isExample, choose } = usePerson();
  const natal = useChart(profile);
  const [dateParam, setDate] = useParam('date');
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);
  const at = useMemo(() => (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam) ? new Date(`${dateParam}T12:00:00Z`) : today), [dateParam, today]);
  const natalSun = natal?.placements.find((x) => x.body === 'sun')!.lon ?? null;
  const prog = useMemo(() => (natal && natalSun !== null && at && profile ? progressions(natal.utc, natalSun, natal.mc, profile.city.lat, at) : null), [natal, natalSun, at, profile]);
  const timeline = useMemo(() => (natal ? progressedTimeline(natal.utc, 100) : null), [natal]);
  if (!profile || !natal || !prog || !timeline || !at) return <Blank />;

  const age = (d: Date) => (d.getTime() - natal.utc.getTime()) / (YEAR_DAYS * DAY);
  const pos = (k: BodyKey) => prog.positions.find((x) => x.body === k)!;
  const pSun = pos('sun');
  const pMoon = pos('moon');
  const sunSign = signOfLon(pSun.lon);
  const moonSign = signOfLon(pMoon.lon);
  const phase = PROG_MOON_PHASE[prog.phase];
  const moonHouse = natal.houses ? houseOf(pMoon.lon, natal.houses) : null;
  const first = profile.name.split(' ')[0];
  const nextMoon = timeline.moon.find((c) => c.date > at);
  const nextSun = timeline.sun.find((c) => c.date > at);

  return (
    <>
      <PersonBar profile={profile} isExample={isExample} choose={choose} />
      <div className={p.controls}>
        <Field label="Progressed to" htmlFor="pr-date">
          <input id="pr-date" className="input" type="date" value={dateParam ?? isoDate(today!)} onChange={(e) => setDate(e.target.value || null)} />
        </Field>
        {dateParam && (
          <button type="button" className="nm-btn nm-btn-outline" onClick={() => setDate(null)}>
            Today
          </button>
        )}
      </div>

      <ResultHead kicker={`Progressed to ${dateLabel(at)}, age ${age(at).toFixed(1)}`} title={`${first}: progressed Sun in ${signName(sunSign)}, Moon in ${signName(moonSign)}`}>
        <p>
          Your progressed chart is the sky {Math.floor(age(at))} days after your birth, one day for each year you have lived. It moves slowly, so it shows the long chapters of life.
        </p>
      </ResultHead>

      <Tiles>
        <SignTile k="sun" label="Progressed Sun" sign={sunSign} lon={pSun.lon} sub={<p>{nextSun ? `Enters ${signName(nextSun.sign)} ${shortDate(nextSun.date)}` : ''}</p>} />
        <SignTile k="moon" label="Progressed Moon" sign={moonSign} lon={pMoon.lon} sub={<p>{nextMoon ? `Enters ${signName(nextMoon.sign)} ${shortDate(nextMoon.date)}` : ''}{moonHouse ? `. In your ${ordinal(moonHouse)} house.` : ''}</p>} />
        {prog.asc !== null && <SignTile k="asc" label="Progressed Ascendant" sign={signOfLon(prog.asc)} lon={prog.asc} />}
        {prog.mc !== null && <SignTile k="mc" label="Progressed Midheaven" sign={signOfLon(prog.mc)} lon={prog.mc} sub={<p>By solar arc.</p>} />}
        <div className={p.tile} style={{ ['--el' as string]: 'var(--p-moon)' }}>
          <p className={p.smallLabel}>Progressed lunation</p>
          <p className={p.tileSign}>{phase.name}</p>
          <p className={p.tileSub}>
            {shortDate(prog.phaseStart)} to {shortDate(prog.phaseEnd)}
          </p>
        </div>
      </Tiles>
      {!profile.time && <Note>Without a birth time the progressed Moon could be off by several degrees, which shifts its sign dates by months, and the progressed angles need the time too.</Note>}

      <Readings>
        <Reading kicker="Lunation phase" title={`${phase.name} phase`}>
          <p>{phase.text}</p>
        </Reading>
        <Reading kicker="Progressed Moon" title={<><SignMark sign={moonSign} /> Progressed Moon in {signName(moonSign)}</>}>
          <p>{PROG_MOON_SIGN[moonSign]}</p>
        </Reading>
        <Reading kicker="Progressed Sun" title={<><SignMark sign={sunSign} /> Progressed Sun in {signName(sunSign)}</>}>
          <p>{PROG_SUN_SIGN[sunSign]}</p>
        </Reading>
      </Readings>

      <div className={p.block}>
        <ResultHead kicker="Personal planets" title="Then and now" />
        <div className={p.scroll}>
          <table className={p.table}>
            <thead>
              <tr>
                <th>Planet</th>
                <th>At birth</th>
                <th>Progressed</th>
                <th>Moved</th>
              </tr>
            </thead>
            <tbody>
              {SHOWN.map((k) => {
                const n = natal.placements.find((x) => x.body === k)!;
                const pr = pos(k);
                const moved = (((pr.lon - n.lon) % 360) + 360) % 360;
                return (
                  <tr key={k}>
                    <td>
                      <span className={p.cellRow}>
                        <PointMark k={k} size={24} /> {bodyByKey(k).name}
                      </span>
                    </td>
                    <td>
                      <span className={p.cellRow}>
                        <SignMark sign={n.sign} size={16} /> {degLabel(n.lon)} {signName(n.sign)}
                      </span>
                    </td>
                    <td>
                      <span className={p.cellRow}>
                        <SignMark sign={signOfLon(pr.lon)} size={16} /> {degLabel(pr.lon)} {signName(signOfLon(pr.lon))}
                        {pr.retrograde && <span className={p.retro}>R</span>}
                      </span>
                    </td>
                    <td>{moved > 180 ? `${(360 - moved).toFixed(1)}° back` : `${moved.toFixed(1)}°`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {SHOWN.filter((k) => k !== 'sun' && k !== 'moon' && signOfLon(pos(k).lon) !== natal.placements.find((x) => x.body === k)!.sign).map((k) => (
          <Note key={k}>
            Your progressed {bodyByKey(k).name} has moved into {signName(signOfLon(pos(k).lon))}. {IN_SIGN[k][signOfLon(pos(k).lon)]}
          </Note>
        ))}
      </div>

      <div className={p.block}>
        <ResultHead kicker="Life chapters" title="Your progressed Moon through life">
          <p>The progressed Moon changes sign about every two and a half years. Each sign is an emotional season.</p>
        </ResultHead>
        <ul className={p.list}>
          {[{ date: natal.utc, sign: natal.placements.find((x) => x.body === 'moon')!.sign }, ...timeline.moon].map((c, i, all) => {
            const end = all[i + 1]?.date;
            const current = c.date <= at && (!end || end > at);
            return (
              <li key={c.date.getTime()} style={current ? { background: 'color-mix(in oklch, var(--astral) 10%, transparent)' } : undefined}>
                <span className={p.listDate}>
                  {i === 0 ? 'Birth' : shortDate(c.date)}
                  <br />
                  Age {age(c.date).toFixed(1)}
                </span>
                <div className={p.listMain}>
                  <span className={p.cellRow}>
                    <SignMark sign={c.sign} size={18} /> Progressed Moon in {signName(c.sign)}
                    {current ? ' (now)' : ''}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={p.block}>
        <ResultHead kicker="Long chapters" title="Progressed Sun and lunation phases" />
        <ul className={p.list}>
          {[...timeline.sun.map((c) => ({ date: c.date, k: 'sun' as const, text: `Progressed Sun enters ${signName(c.sign)}` })), ...timeline.phases.filter((c) => c.phase === 0 || c.phase === 4).map((c) => ({ date: c.date, k: 'moon' as const, text: `Progressed ${PHASES[c.phase]} Moon` }))]
            .sort((x, y) => x.date.getTime() - y.date.getTime())
            .map((c) => (
              <li key={`${c.k}${c.date.getTime()}`} style={c.date > at ? undefined : { opacity: 0.6 }}>
                <span className={p.listDate}>
                  {shortDate(c.date)}, age {age(c.date).toFixed(1)}
                </span>
                <div className={p.listMain}>
                  <span className={p.cellRow}>
                    <PointMark k={c.k} size={22} /> {c.text}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <div className={p.actions}>
        <Link href="/tools/saturn-return" className="nm-btn nm-btn-primary">
          Your Saturn return
        </Link>
        <Link href="/tools/solar-return" className="nm-btn nm-btn-outline">
          Your solar return
        </Link>
      </div>
    </>
  );
}
