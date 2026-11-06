'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import ChartWheel from '@/components/ChartWheel';
import { useChart } from '@/components/useChart';
import { chartAt } from '@/lib/astro/chart';
import { bodyByKey } from '@/lib/astro/constants';
import { IN_SIGN, ordinal } from '@/lib/astro/interpretations';
import { LUNAR_RETURN_ASC, LUNAR_RETURN_MOON_HOUSE } from '@/lib/astro/interpretations/returns';
import { lunarReturns } from '@/lib/astro/timing';
import { Blank, CityField, Note, PersonBar, PointMark, Reading, Readings, ResultHead, SignMark, SignTile, Tiles, partStyles as p, dateLabel, degLabel, shortDate, signName, signOfLon, timeLabel, useCityParam, useParam, usePerson } from '../_tool/parts';

const DAY = 86400e3;

export default function LunarReturnTool() {
  const { profile, isExample, choose } = usePerson();
  const natal = useChart(profile);
  const [city, setCity] = useCityParam('pc', profile?.city ?? null);
  const [pick, setPick] = useParam('i');
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  const moonLon = natal?.placements.find((x) => x.body === 'moon')!.lon ?? null;
  // The return you are in now, then the next 13.
  const list = useMemo(() => {
    if (moonLon === null || !now) return [];
    const all = lunarReturns(moonLon, new Date(now.getTime() - 29 * DAY), 16);
    const current = Math.max(0, all.filter((d) => d <= now).length - 1);
    return all.slice(current, current + 14);
  }, [moonLon, now]);
  const index = Math.min(Math.max(Number(pick ?? 0) || 0, 0), Math.max(list.length - 1, 0));
  const moment = list[index] ?? null;
  const lr = useMemo(() => (moment && city ? chartAt(moment, city.lat, city.lon) : null), [moment, city]);
  if (!profile || !natal || !lr || !city || !moment || moonLon === null) return <Blank />;

  const tz = city.timeZone;
  const ascSign = Math.floor(lr.asc! / 30);
  const moon = lr.placements.find((x) => x.body === 'moon')!;
  const sun = lr.placements.find((x) => x.body === 'sun')!;
  const end = list[index + 1];
  const first = profile.name.split(' ')[0];

  return (
    <>
      <PersonBar profile={profile} isExample={isExample} choose={choose} />
      <div className={p.controls}>
        <CityField id="lr-city" label="Where you will be" value={city} onChange={setCity} />
      </div>

      <p className={p.smallLabel} style={{ marginBottom: 12 }}>
        Pick a month
      </p>
      <div className={p.picks}>
        {list.map((d, i) => {
          const c = city ? Math.floor(chartAt(d, city.lat, city.lon).asc! / 30) : 0;
          return (
            <button key={d.getTime()} type="button" className={p.pick} aria-pressed={i === index} onClick={() => setPick(i === 0 ? null : String(i))}>
              <span className={p.pickMain}>{shortDate(d, tz)}</span>
              <span className={p.pickMeta}>
                {i === 0 && d <= now! ? 'Now · ' : ''}
                {signName(c)} rising
              </span>
            </button>
          );
        })}
      </div>

      <ResultHead kicker={`Lunar return, ${shortDate(moment, tz)}`} title={`${first}’s month: ${signName(ascSign)} rising, Moon in the ${ordinal(moon.house!)} house`}>
        <p>
          The Moon returns to {degLabel(moonLon)} {signName(signOfLon(moonLon))} on {dateLabel(moment, tz)} at {timeLabel(moment, tz)} in {city.name}. This chart colors your feelings until {end ? `${dateLabel(end, tz)}` : 'the next return'}.
        </p>
      </ResultHead>
      {!profile.time && <Note>Without a birth time your natal Moon could be off by up to seven degrees, which moves every return by up to half a day. Add your birth time for exact charts.</Note>}

      <Tiles>
        <SignTile k="asc" label="Month’s rising sign" sign={ascSign} lon={lr.asc!} />
        <SignTile k="moon" label={`Moon in the ${ordinal(moon.house!)} house`} sign={moon.sign} lon={moon.lon} />
        <SignTile k="sun" label={`Sun in the ${ordinal(sun.house!)} house`} sign={sun.sign} lon={sun.lon} />
      </Tiles>

      <Readings>
        <Reading kicker="Mood of the month" title={<><SignMark sign={ascSign} /> {signName(ascSign)} rising</>}>
          <p>{LUNAR_RETURN_ASC[ascSign]}</p>
        </Reading>
        <Reading kicker="Where feelings gather" title={`Moon in the ${ordinal(moon.house!)} house`}>
          <p>{LUNAR_RETURN_MOON_HOUSE[moon.house! - 1]}</p>
        </Reading>
        <Reading kicker="Your Moon" title={<><SignMark sign={moon.sign} /> Moon in {signName(moon.sign)}</>}>
          <p>{IN_SIGN.moon[moon.sign]}</p>
        </Reading>
      </Readings>

      <div className={p.wheel}>
        <ChartWheel chart={lr} name={`Lunar return ${shortDate(moment, tz)}`} ground="light" />
      </div>

      <div className={p.scroll}>
        <table className={p.table}>
          <thead>
            <tr>
              <th>Planet</th>
              <th>Sign</th>
              <th>Degree</th>
              <th>House</th>
            </tr>
          </thead>
          <tbody>
            {lr.placements.map((x) => (
              <tr key={x.body}>
                <td>
                  <span className={p.cellRow}>
                    <PointMark k={x.body} size={24} /> {bodyByKey(x.body).name}
                    {x.retrograde && <span className={p.retro}>R</span>}
                  </span>
                </td>
                <td>
                  <span className={p.cellRow}>
                    <SignMark sign={x.sign} size={16} /> {signName(x.sign)}
                  </span>
                </td>
                <td>{degLabel(x.lon)}</td>
                <td>{ordinal(x.house!)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={p.actions}>
        <Link href="/tools/solar-return" className="nm-btn nm-btn-primary">
          Your solar return
        </Link>
        <Link href="/tools/moon-sign" className="nm-btn nm-btn-outline">
          Your Moon sign
        </Link>
      </div>
    </>
  );
}
