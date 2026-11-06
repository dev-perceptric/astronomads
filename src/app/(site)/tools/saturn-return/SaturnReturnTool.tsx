'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useChart } from '@/components/useChart';
import { positionsAt } from '@/lib/astro/chart';
import { ordinal } from '@/lib/astro/interpretations';
import { SATURN_NOW, SATURN_RETURN_HOUSE, SATURN_RETURN_SIGN, SATURN_RETURN_STAGE } from '@/lib/astro/interpretations/cycles';
import { YEAR_DAYS, saturnReturns } from '@/lib/astro/timing';
import { Blank, PersonBar, PointMark, Reading, Readings, ResultHead, SignMark, SignTile, Tiles, partStyles as p, dateLabel, degLabel, shortDate, signName, signOfLon, usePerson } from '../_tool/parts';

const DAY = 86400e3;
const STAGES = ['first', 'second', 'third'] as const;
const sep = (a: number, b: number) => Math.abs(((a - b + 540) % 360) - 180);

export default function SaturnReturnTool() {
  const { profile, isExample, choose } = usePerson();
  const natal = useChart(profile);
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  const sat = natal?.placements.find((x) => x.body === 'saturn') ?? null;
  const returns = useMemo(() => (natal && sat ? saturnReturns(sat.lon, natal.utc, 100) : []), [natal, sat]);
  if (!profile || !natal || !sat || !now) return <Blank />;

  const age = (d: Date) => (d.getTime() - natal.utc.getTime()) / (YEAR_DAYS * DAY);
  const ageNow = age(now);
  const satNow = positionsAt(now).find((x) => x.body === 'saturn')!.lon;
  const gap = sep(satNow, sat.lon);
  const active = returns.find((r) => r.enters && r.leaves && r.enters <= now && r.leaves >= now);
  const next = returns.find((r) => r.passes[0] > now);
  const state: keyof typeof SATURN_NOW = gap <= 1 ? 'exact' : active ? (now < active.passes[0] ? 'approaching' : 'after') : 'between';
  const first = profile.name.split(' ')[0];

  return (
    <>
      <PersonBar profile={profile} isExample={isExample} choose={choose} />
      <ResultHead kicker="Your Saturn return" title={next ? `${first}: next Saturn return ${next.passes[0].getUTCFullYear()}, at age ${Math.floor(age(next.passes[0]))}` : `${first}: Saturn returns through life`}>
        <p>
          Saturn was at {degLabel(sat.lon)} {signName(sat.sign)} when you were born. Every 29 or 30 years it comes back to that exact degree. Today it is at {degLabel(satNow)} {signName(signOfLon(satNow))}, {Math.round(gap)}° away.
        </p>
      </ResultHead>

      <Tiles>
        <SignTile k="saturn" label="Natal Saturn" sign={sat.sign} lon={sat.lon} sub={<p>{sat.house ? `In your ${ordinal(sat.house)} house` : 'Add a birth time for the house'}{sat.retrograde ? ', retrograde' : ''}</p>} />
        <SignTile k="saturn" label="Saturn today" sign={signOfLon(satNow)} lon={satNow} sub={<p>{Math.round(gap)}° from your natal Saturn</p>} />
        <div className={p.tile} style={{ ['--el' as string]: 'var(--p-saturn)' }}>
          <p className={p.smallLabel}>Your age</p>
          <p className={p.tileSign}>{ageNow.toFixed(1)}</p>
          <p className={p.tileSub}>{state === 'between' ? (next ? `About ${Math.max(0, age(next.passes[0]) - ageNow).toFixed(1)} years to your next return.` : 'Past your returns.') : state === 'exact' ? 'Your Saturn return is exact now.' : 'You are in your return season now.'}</p>
        </div>
      </Tiles>

      <Readings>
        <Reading kicker="Right now" title={state === 'exact' ? 'Your return is exact' : state === 'approaching' ? 'Your return is coming' : state === 'after' ? 'Your return is winding down' : 'Between returns'}>
          <p>{SATURN_NOW[state]}</p>
        </Reading>
        <Reading kicker="By sign" title={<><SignMark sign={sat.sign} /> Saturn return in {signName(sat.sign)}</>}>
          <p>{SATURN_RETURN_SIGN[sat.sign]}</p>
        </Reading>
        {sat.house && (
          <Reading kicker="By house" title={`Saturn return in the ${ordinal(sat.house)} house`}>
            <p>{SATURN_RETURN_HOUSE[sat.house - 1]}</p>
          </Reading>
        )}
      </Readings>

      {returns.map((r, i) => (
        <div key={r.n} className={p.block}>
          <ResultHead kicker={`${['First', 'Second', 'Third', 'Fourth'][i]} return, ages ${Math.floor(age(r.passes[0]))} to ${Math.floor(age(r.passes[r.passes.length - 1]))}`} title={`${r.passes[0].getUTCFullYear()}${r.passes.length > 1 ? ` to ${r.passes[r.passes.length - 1].getUTCFullYear()}` : ''}`}>
            {STAGES[i] && <p>{SATURN_RETURN_STAGE[STAGES[i]]}</p>}
          </ResultHead>
          <ul className={p.list}>
            {r.enters && (
              <li>
                <span className={p.listDate}>{shortDate(r.enters)}</span>
                <div className={p.listMain}>
                  <p>Saturn enters {signName(sat.sign)}</p>
                  <p className={p.listMeta}>Your return season begins. Age {age(r.enters).toFixed(1)}.</p>
                </div>
              </li>
            )}
            {r.passes.map((d, j) => (
              <li key={d.getTime()}>
                <span className={p.listDate}>{dateLabel(d)}</span>
                <div className={p.listMain}>
                  <p>
                    <span className={p.cellRow}>
                      <PointMark k="saturn" size={24} /> Exact return{r.passes.length > 1 ? `, pass ${j + 1} of ${r.passes.length}` : ''}
                    </span>
                  </p>
                  <p className={p.listMeta}>
                    {r.passes.length > 1 ? (j === 0 ? 'Saturn reaches the degree moving forward.' : j === 1 ? 'Saturn crosses back while retrograde.' : 'Saturn crosses for the last time, moving forward.') : 'One clean pass.'} Age {age(d).toFixed(1)}.
                  </p>
                </div>
              </li>
            ))}
            {r.leaves && (
              <li>
                <span className={p.listDate}>{shortDate(r.leaves)}</span>
                <div className={p.listMain}>
                  <p>Saturn moves into {signName((sat.sign + 1) % 12)}</p>
                  <p className={p.listMeta}>Your return season closes. Age {age(r.leaves).toFixed(1)}.</p>
                </div>
              </li>
            )}
          </ul>
        </div>
      ))}

      <div className={p.actions}>
        <Link href="/tools/progressions" className="nm-btn nm-btn-primary">
          Your progressions
        </Link>
        <Link href="/tools/transits" className="nm-btn nm-btn-outline">
          Transits for any date
        </Link>
      </div>
    </>
  );
}
